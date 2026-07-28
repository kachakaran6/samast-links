import { useState, useEffect, Component, ErrorInfo, ReactNode } from "react";
import { useUserContext } from "@/context/AuthContext";
import { useGetLinks, useGetLinkBlocks } from "@/lib/react-query/queries";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { createLink, manageLinkBlock, deleteLinkBlockById } from "@/lib/supabase/api";
import { getDynamicPublicUrl } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import {
  Plus,
  GripVertical,
  Globe,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Monitor,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import DisplayLink from "../DisplayLink/DisplayLink";

// Error Boundary for contained preview pane
interface PreviewBoundaryProps {
  children: ReactNode;
}
interface PreviewBoundaryState {
  hasError: boolean;
}

class PreviewErrorBoundary extends Component<
  PreviewBoundaryProps,
  PreviewBoundaryState
> {
  state: PreviewBoundaryState = { hasError: false };

  static getDerivedStateFromError(): PreviewBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Preview render error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-[#222522] border border-[#3B403B] rounded-2xl gap-3 text-[#F4F0E8] h-[500px]">
          <AlertTriangle className="w-8 h-8 text-amber-400" />
          <h4 className="text-sm font-bold">Preview unavailable</h4>
          <p className="text-xs text-[#B5BAB2] max-w-[240px]">
            Your saved changes are safe. Try refreshing the preview simulator.
          </p>
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#2C302C] hover:bg-[#3B403B] text-xs font-bold rounded-lg border border-[#3B403B]">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Preview</span>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const LinksWorkspace = () => {
  const { user } = useUserContext();
  const { accent } = useTheme();
  const queryClient = useQueryClient();

  const { data: linksData, isLoading: isLinksLoading } = useGetLinks(user?.id || "");
  const links = linksData?.documents || [];
  const selectedLink = links[0];

  const { data: blocksData } = useGetLinkBlocks(selectedLink?.$id || selectedLink?.id || "");
  const blocks = blocksData?.documents || [];

  // Local state for link management
  const [items, setItems] = useState<any[]>(blocks);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [deviceMode, setDeviceMode] = useState<"mobile" | "desktop">("mobile");
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sync items when blocks data changes
  useEffect(() => {
    if (blocks && blocks.length > 0) {
      setItems(blocks);
    }
  }, [blocksData]);

  const saveLinkBlocks = async (updatedItems: any[]) => {
    setIsSaving(true);
    try {
      let linkId = selectedLink?.$id || selectedLink?.id;
      if (!linkId) {
        const linkPayload = {
          userId: user?.id || `user_${Date.now()}`,
          title: user?.name || "My Bio Page",
          slug: user?.username || `user_${Date.now()}`,
          description: "Welcome to my bio page!",
          file: [],
        };
        const newLink: any = await createLink(linkPayload);
        linkId = newLink?.$id || newLink?.id;
      }

      if (linkId) {
        const managed = await manageLinkBlock(updatedItems, linkId);
        if (managed && Array.isArray(managed)) {
          setItems(managed);
        }
        queryClient.invalidateQueries([QUERY_KEYS.GET_USER_LINKS]);
        queryClient.invalidateQueries([QUERY_KEYS.GET_LINK_BLOCKS]);
      }
    } catch (err) {
      console.error("Save link blocks error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddLink = async () => {
    if (!newTitle.trim() || !newUrl.trim()) {
      toast.error("Please provide both title and destination URL");
      return;
    }
    const newBlock = {
      $id: `temp-${Date.now()}`,
      title: newTitle.trim(),
      url: newUrl.trim(),
      link: newUrl.trim(),
      val: { link: newUrl.trim(), title: newTitle.trim() },
      block_type: "simple_link",
      is_active: true,
      block_order: items.length + 1,
    };
    const nextItems = [newBlock, ...items];
    setItems(nextItems);
    setNewTitle("");
    setNewUrl("");
    setIsAddingLink(false);

    await saveLinkBlocks(nextItems);
    setHasUnpublishedChanges(false);
    toast.success("Link saved successfully!");
  };

  const handleToggleVisibility = async (id: string) => {
    const nextItems = items.map((item) =>
      (item.$id || item.id) === id ? { ...item, is_active: !item.is_active } : item
    );
    setItems(nextItems);
    setHasUnpublishedChanges(true);
    await saveLinkBlocks(nextItems);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this link?")) {
      const nextItems = items.filter((item) => (item.$id || item.id) !== id);
      setItems(nextItems);
      if (id && !id.startsWith("temp-")) {
        await deleteLinkBlockById(id);
      }
      await saveLinkBlocks(nextItems);
      toast.success("Link removed!");
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const newItems = [...items];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    const reordered = newItems.map((item, idx) => ({ ...item, block_order: idx + 1 }));
    setItems(reordered);
    setHasUnpublishedChanges(true);
    await saveLinkBlocks(reordered);
  };

  const handlePublish = async () => {
    await saveLinkBlocks(items);
    setHasUnpublishedChanges(false);
    toast.success("Your page changes are now published live!");
  };

  const publicHandle = user?.username || "me";
  const publicUrl = getDynamicPublicUrl(publicHandle);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6 md:py-8 flex flex-col gap-6">
      {/* Top Action Bar */}
      <div className="flex justify-end border-b border-border pb-5">

        <div className="flex items-center gap-3">
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-surface hover:bg-surface-muted border border-border text-ink text-xs font-bold rounded-xl transition-all">
            <span>View page</span>
            <ExternalLink className="w-3.5 h-3.5 text-ink-muted" />
          </a>

          <button
            onClick={handlePublish}
            disabled={isSaving}
            style={hasUnpublishedChanges && !isSaving ? { backgroundColor: accent.color } : undefined}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-sm ${
              isSaving
                ? "bg-surface-muted text-amber-400 cursor-wait border border-border"
                : hasUnpublishedChanges
                ? "text-white cursor-pointer"
                : "bg-surface-muted text-ink-muted border border-border"
            }`}>
            {isSaving ? "Saving…" : hasUnpublishedChanges ? "Publish changes" : "Published"}
          </button>
        </div>
      </div>

      {/* 2-Column Grid: Editor List & Mobile Preview Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Column 1: Link Editor List (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Add Link Action Bar */}
          <div className="bg-surface border border-border rounded-2xl p-4 flex flex-col gap-3">
            {!isAddingLink ? (
              <button
                onClick={() => setIsAddingLink(true)}
                style={{ backgroundColor: accent.color }}
                className="w-full py-3 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md">
                <Plus className="w-4 h-4" />
                <span>Add new link block</span>
              </button>
            ) : (
              <div className="flex flex-col gap-3 bg-canvas border border-border rounded-xl p-4">
                <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                  New Link Block
                </h4>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-semibold text-ink-muted">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. My Latest YouTube Video"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    maxLength={80}
                    className="w-full px-3 py-2 bg-surface border border-border rounded-xl text-xs text-ink placeholder:text-ink-muted focus:border-accent outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-semibold text-ink-muted">Destination URL</label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-surface border border-border rounded-xl text-xs text-ink placeholder:text-ink-muted focus:border-accent outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsAddingLink(false)}
                    className="px-3 py-1.5 bg-surface-muted hover:bg-border text-xs font-bold text-ink-muted rounded-lg">
                    Cancel
                  </button>
                  <button
                    onClick={handleAddLink}
                    style={{ backgroundColor: accent.color }}
                    className="px-4 py-1.5 text-xs font-bold text-white rounded-lg shadow-sm">
                    Save Link
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Link Rows */}
          {isLinksLoading ? (
            <div className="p-8 text-center text-xs text-ink-muted">Loading link blocks…</div>
          ) : items.length === 0 ? (
            <div className="p-8 border border-dashed border-border rounded-2xl text-center flex flex-col items-center gap-3">
              <Globe className="w-8 h-8 text-ink-muted" />
              <p className="text-xs text-ink-muted">No links created yet. Click "Add new link block" above.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item, index) => {
                const isExpanded = expandedId === item.$id;
                return (
                  <div
                    key={item.$id || index}
                    className="bg-surface border border-border rounded-2xl overflow-hidden transition-all shadow-sm">
                    {/* Compact Card Row */}
                    <div className="p-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 truncate">
                        <button
                          title="Drag to reorder"
                          className="cursor-grab text-ink-muted hover:text-ink">
                          <GripVertical className="w-4 h-4" />
                        </button>

                        <div className="flex flex-col truncate">
                          <span className="text-xs font-bold text-ink truncate">
                            {item.title || item.slug || "Untitled Link"}
                          </span>
                          <span className="text-[11px] font-mono text-[#B5BAB2] truncate">
                            {item.url || item.link || `#`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Order Controls */}
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => handleMove(index, "up")}
                            disabled={index === 0}
                            className="p-1 text-[#B5BAB2] hover:text-white disabled:opacity-20">
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMove(index, "down")}
                            disabled={index === items.length - 1}
                            className="p-1 text-[#B5BAB2] hover:text-white disabled:opacity-20">
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Visibility Switch */}
                        <button
                          onClick={() => handleToggleVisibility(item.$id)}
                          className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                            item.is_active !== false ? "bg-[#6EBB91]" : "bg-[#3B403B]"
                          }`}>
                          <span
                            className={`w-4 h-4 rounded-full bg-white transition-transform ${
                              item.is_active !== false ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>

                        {/* Expand Toggle */}
                        <button
                          onClick={() =>
                            setExpandedId(isExpanded ? null : item.$id)
                          }
                          className="px-2 py-1 bg-[#2C302C] hover:bg-[#3B403B] text-[11px] font-bold text-[#F4F0E8] rounded-lg">
                          {isExpanded ? "Done" : "Edit"}
                        </button>
                      </div>
                    </div>

                    {/* Inline Expanded Editor */}
                    {isExpanded && (
                      <div className="p-4 border-t border-[#3B403B] bg-[#181A18] flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-semibold text-[#B5BAB2]">Title</label>
                          <input
                            type="text"
                            value={item.title || ""}
                            onChange={(e) =>
                              setItems((prev) =>
                                prev.map((it) =>
                                  it.$id === item.$id
                                    ? { ...it, title: e.target.value }
                                    : it
                                )
                              )
                            }
                            className="w-full px-3 py-2 bg-[#222522] border border-[#3B403B] rounded-xl text-xs text-white outline-none focus:border-[#D17A67]"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-semibold text-[#B5BAB2]">Destination URL</label>
                          <input
                            type="url"
                            value={item.url || item.link || ""}
                            onChange={(e) =>
                              setItems((prev) =>
                                prev.map((it) =>
                                  it.$id === item.$id
                                    ? { ...it, url: e.target.value }
                                    : it
                                )
                              )
                            }
                            className="w-full px-3 py-2 bg-[#222522] border border-[#3B403B] rounded-xl text-xs text-white outline-none focus:border-[#D17A67]"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            onClick={() => handleDelete(item.$id)}
                            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-bold">
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete link</span>
                          </button>

                          <span className="text-[10px] text-[#B5BAB2]">
                            Changes save to draft automatically
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Column 2: Contained Live Mobile Preview Pane (lg:col-span-5) */}
        <div className="lg:col-span-5 sticky top-[96px] flex flex-col gap-3">
          <div className="bg-[#222522] border border-[#3B403B] rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Live Preview</span>
              <span className="w-2 h-2 rounded-full bg-[#6EBB91]" />
            </div>

            {/* Device Switcher */}
            <div className="flex items-center bg-[#181A18] border border-[#3B403B] rounded-lg p-0.5">
              <button
                onClick={() => setDeviceMode("mobile")}
                className={`p-1.5 rounded-md text-xs font-bold flex items-center gap-1 ${
                  deviceMode === "mobile"
                    ? "bg-[#D17A67] text-white"
                    : "text-[#B5BAB2] hover:text-white"
                }`}>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>

              <button
                onClick={() => setDeviceMode("desktop")}
                className={`p-1.5 rounded-md text-xs font-bold flex items-center gap-1 ${
                  deviceMode === "desktop"
                    ? "bg-[#D17A67] text-white"
                    : "text-[#B5BAB2] hover:text-white"
                }`}>
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Full</span>
              </button>
            </div>
          </div>

          {/* Device Canvas Frame */}
          <PreviewErrorBoundary>
            <div className="bg-[#181A18] border border-[#3B403B] rounded-2xl p-4 flex justify-center items-center overflow-hidden min-h-[600px] shadow-2xl">
              <div
                className={`transition-all duration-300 bg-white rounded-[32px] border-[8px] border-[#222522] shadow-2xl overflow-y-auto ${
                  deviceMode === "mobile"
                    ? "w-[360px] h-[640px]"
                    : "w-full max-w-[680px] h-[640px]"
                }`}>
                <DisplayLink />
              </div>
            </div>
          </PreviewErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default LinksWorkspace;
