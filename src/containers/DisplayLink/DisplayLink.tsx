import { Separator } from "@/components/ui/separator";
import {
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  MoreVerticalIcon,
  Share2,
  Slack,
  Twitch,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui";
import {
  FaXTwitter,
  FaTelegram,
  FaSkype,
  FaPinterest,
  FaBehance,
  FaTumblr,
} from "react-icons/fa6";
import {
  getLinkBlocksByLinkId,
  getLinkBySlug,
  getSocialMediaByLinkId,
  handleBlockClick,
  saveStatsToDb,
} from "@/lib/supabase/api";
import {
  Suspense,
  lazy,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { appConfig } from "@/lib/config/appConfig";
import useIsElementInViewport from "@/hooks/useIsElementInViewport";
import useSEO from "@/hooks/useSeo";
import { Skeleton } from "@/components/ui/skeleton";
import { themeData } from "@/constants/index";
import { PHASE1_THEMES } from "@/constants/themeConfig";
import ShareDrawer from "./components/ShareDrawer";
import useGoogleAnalytics from "@/hooks/GoogleAnalytics";
const Text = lazy(() => import("./blocks/Text"));
const GithubRepoCard = lazy(() => import("./blocks/GithubRepoCard"));
const SimpleLink = lazy(() => import("./blocks/SimpleLink"));
const GitHubContributions = lazy(() => import("./blocks/GitHubContributions"));
const GitHubProfileCard = lazy(() => import("./blocks/GitHubProfileCard"));

const RESERVED_SLUGS = [
  "app",
  "overview",
  "links",
  "link",
  "appearance",
  "analytics",
  "settings",
  "subscription",
  "sign-in",
  "sign-up",
  "reset-password",
  "privacy",
  "terms",
  "refunds",
  "api",
  "_next",
  "favicon.ico",
];

const DisplayLink = () => {
  const { slug } = useParams();

  // Guard against rendering reserved application route names as public user profiles
  if (slug && RESERVED_SLUGS.includes(slug.toLowerCase())) {
    window.location.href = `/${slug.toLowerCase()}`;
    return null;
  }

  const [linkData, setLinkData] = useState<any>(null);
  const [linkLoading, setLinkLoading] = useState<any>(true);
  const [shareDrawerOpened, setShareDrawerOpened] = useState<any>(false);
  const [isApiLinkDataLoaded, setisApiLinkDataLoaded] = useState<any>(false);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [socials, setSocials] = useState<any>([]);
  const [ipData, setIpData] = useState<any>(null);
  const [linkTheme, setLinkTheme] = useState<any>({});
  const imgElementRef = useRef(null);
  const isPreviewPage = window.location.href.includes("previewPage");
  const isInViewport = useIsElementInViewport(imgElementRef);
  const handleSeo = useSEO();
  const analyticsCode = useGoogleAnalytics();

  useEffect(() => {
    try {
      if (isPreviewPage) return;
      if (!ipData && !window.location.href.includes("dHlwZT1wcmV2aWV3")) {
        let ipData: any = localStorage.getItem("localData");
        if (
          ipData === null ||
          ipData === undefined ||
          ipData == "" ||
          !JSON.parse(ipData)?.query
        ) {
          getMyIP();
        } else {
          setIpData(JSON.parse(ipData ?? ""));
        }
      }
      if (!linkData) {
        getLinkData();
      }
    } catch (error) {
      localStorage.removeItem("localData");
    }
  }, []);

  useLayoutEffect(() => {
    try {
      let tempLinkData = localStorage.getItem("linkData");
      if (tempLinkData) {
        let tempLink = JSON.parse(tempLinkData);
        if (tempLink[slug!]) {
          let singleLink = tempLink[slug!];
          if (singleLink) {
            setLinkData(singleLink.linkData);
            setBlocks(singleLink.blocks);
            setLinkLoading(false);
          }
        }
      }
    } catch (error) {}
  }, []);

  const getLinkData = async () => {
    if (isPreviewPage) return;
    setLinkLoading(true);
    const link = await getLinkBySlug(slug ? slug : "");
    if (link) {
      setisApiLinkDataLoaded(true);
      setLinkData(link);
      handlSeoData(link);
      if (link?.ga_tag) {
        analyticsCode(link?.ga_tag);
      }
      saveStatsInfo();
    } else {
      setLinkLoading(false);
      try {
        const rawLocal = localStorage.getItem("lm_links");
        const localLinks = rawLocal ? JSON.parse(rawLocal) : [];
        const match = localLinks.find((l: any) => l.slug === slug || l.userId);
        if (match) {
          setisApiLinkDataLoaded(true);
          setLinkData(match);
          handlSeoData(match);
          return;
        }
      } catch (e) {}

      // Default demo bio data if slug does not exist in DB yet
      const defaultBio = {
        $id: `demo_${slug || "me"}`,
        title: "Linkmonks Creator",
        slug: slug || "me",
        description: "Welcome to my official bio page!",
        imageUrl: "/assets/icons/profile-placeholder.svg",
      };
      setisApiLinkDataLoaded(true);
      setLinkData(defaultBio);
    }
  };

  const handlSeoData = (link: any) => {
    if (isPreviewPage) return;
    document.title = link?.title;
    setFavicon(link?.imageUrl);
  };

  function setFavicon(url: any) {
    // Remove any existing favicon
    const existingFavicon = document.querySelector("link[rel='icon']");
    if (existingFavicon) {
      existingFavicon.remove();
    }

    // Create a new link element for the favicon
    const faviconLink = document.createElement("link");
    faviconLink.rel = "icon";
    faviconLink.href = url;

    // Append the link to the head of the document
    document.head.appendChild(faviconLink);
  }

  async function getMyIP() {
    return;
    if (isPreviewPage) return;
    try {
      const response = await fetch("http://ip-api.com/json");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const ipResData = await response.json();
      if (ipResData) {
        setIpData(ipResData);
        localStorage.setItem("localData", JSON.stringify(ipResData));
      }
    } catch (error: any) {
      console.error("Error fetching IP address:", error.message);
    }
  }

  useEffect(() => {
    const phase1Theme = PHASE1_THEMES.find(
      (t) => t.id === linkData?.theme_key || t.name.toLowerCase().replace(/\s+/g, "-") === linkData?.theme_key
    );
    const legacyTheme = themeData.find((ele: any) => linkData?.theme_key === ele?.name);
    const baseTheme: any = phase1Theme || legacyTheme || PHASE1_THEMES[0];

    const computedTheme = {
      ...baseTheme,
      mainBg: baseTheme.mainBg,
      mainColor: baseTheme.mainColor,
      accentColor: linkData?.custom_accent || baseTheme.accentColor,
      borderRadius: linkData?.custom_button_shape || baseTheme.borderRadius,
    };

    setLinkTheme(computedTheme);
    if (isPreviewPage) return;
    if (linkData?.$id && isApiLinkDataLoaded) {
      getAllBlocks();
      if (linkData?.is_show_social_icons) {
        getSocialMediaLinks();
      }
    }
  }, [linkData]);

  useEffect(() => {
    if (isPreviewPage) return;
    saveStatsInfo();
  }, [linkData, ipData]);

  const getAllBlocks = async () => {
    if (isPreviewPage) return;
    try {
      const res: any = await getLinkBlocksByLinkId(linkData?.$id || linkData?.id);
      let fetchedBlocks = Array.isArray(res) ? res : [];

      if (fetchedBlocks.length === 0) {
        try {
          const rawLmBlocks = localStorage.getItem("lm_blocks");
          if (rawLmBlocks) {
            fetchedBlocks = JSON.parse(rawLmBlocks);
          }
        } catch (e) {}
      }

      // If still empty, provide rich demo blocks for a great public profile presentation
      if (fetchedBlocks.length === 0) {
        fetchedBlocks = [
          {
            id: "demo_1",
            block_type: "simple_link",
            title: "🌐 Official Website & Portfolio",
            link: "https://samast.pro",
            imageUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=samast",
          },
          {
            id: "demo_2",
            block_type: "simple_link",
            title: "💻 GitHub Open Source Projects",
            link: "https://github.com/kachakaran6",
            imageUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=github",
          },
          {
            id: "demo_3",
            block_type: "simple_link",
            title: "🐤 Follow on Twitter / X",
            link: "https://x.com/karan",
            imageUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=twitter",
          },
        ];
      }

      setBlocks(fetchedBlocks);
      setLinkLoading(false);
    } catch (err) {
      console.error("getAllBlocks error:", err);
      setLinkLoading(false);
    }
  };

  const getSocialMediaLinks = async () => {
    if (isPreviewPage) return;
    await getSocialMediaByLinkId(linkData?.$id).then((links: any) => {
      if (links) {
        // List of keys to be removed
        const keysToRemove = [
          "$id",
          "$createdAt",
          "$updatedAt",
          "$permissions",
          "$databaseId",
          "$collectionId",
          "link_id",
        ];

        // Creating a new object without the specified keys from the original links object
        const filteredLinks = Object.fromEntries(
          Object.entries(links).filter(([key]) => !keysToRemove.includes(key))
        );

        const filteredData = Object.entries(filteredLinks)
          .filter(([key, value]) => key != "" && value !== null && value !== "") // Remove null and blank values
          .map(([key, value]) => ({
            key,
            value: createSocialMediaUrl(key, value),
          }));

        setSocials(filteredData);
      }
    });
  };

  // Define a function to create URLs
  const createSocialMediaUrl = (platform: any, value: any) => {
    if (isPreviewPage) return;
    const platformUrls: any = {
      instagram: (value: any) => `https://instagram.com/${value}`,
      twitter: (value: any) => `https://x.com/${value}`,
      telegram: (value: any) => `https://telegram.me/${value}`,
      snapchat: (value: any) => `https://snapchat.com/add/${value}`,
      reddit: (value: any) => `https://reddit.com/user/${value}`,
      github: (value: any) => `https://github.com/${value}`,
      tiktok: (value: any) => `https://tiktok.com/@${value}`,
      medium: (value: any) => `https://medium.com/@${value}`,
      tumblr: (value: any) => `https://${value}.tumblr.com/`,
      twitch: (value: any) => `https://twitch.tv/${value}`,
      linked_in: (value: any) => `https://linkedin.com/in/${value}`,
      pinterest: (value: any) => `https://pinterest.com/${value}`,
      youtube: (value: any) => `https://youtube.com/@${value}`,
      leetcode: (value: any) => `https://leetcode.com/${value}`,
      patreon: (value: any) => `https://patreon.com/${value}`,
      facebook: (value: any) => `https://facebook.com/${value}`,
      mastodon: (value: any) => `https://mastodon.social/@${value}`,
      spotify: (value: any) => `https://open.spotify.com/user/${value}`,
      stackoverflow: (value: any) => `https://stackoverflow.com/users/${value}`,
    };
    const normalizeUrl = platformUrls[platform];
    return normalizeUrl ? normalizeUrl(value) : value;
  };

  const isValidUrl = (url: any) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const saveStatsInfo = async () => {
    return;
    if (isPreviewPage) return;
    if (window.location.href.includes("dHlwZT1wcmV2aWV3")) return;
    if (linkData?.$id && ipData?.ip) {
      await saveStatsToDb({
        city: ipData?.city,
        region: ipData?.region,
        country: ipData?.country,
        link_id: linkData?.$id,
        countryCode: ipData?.countryCode,
        referrer: document?.referrer ? document?.referrer : null,
        ip_address: ipData?.query,
        zip: ipData?.postal,
      });
    }
  };

  useEffect(() => {
    if (isPreviewPage || !linkData) return;
    var head = document.head;
    var existingOgTags = head.querySelectorAll('meta[property^="og:"]');
    existingOgTags.forEach(function (tag) {
      head.removeChild(tag);
    });
    if (linkData?.seo_title) {
      handleSeo(
        linkData?.seo_title,
        linkData?.seo_keywords,
        linkData?.seo_description
      );
    }

    // Set OG meta tags when component mounts or props change
    const ogTitleMeta = document.createElement("meta");
    ogTitleMeta.setAttribute("property", "og:title");
    ogTitleMeta.content = linkData?.title;
    document.head.appendChild(ogTitleMeta);

    const ogDescriptionMeta = document.createElement("meta");
    ogDescriptionMeta.setAttribute("property", "og:description");
    ogDescriptionMeta.content = linkData?.description;
    document.head.appendChild(ogDescriptionMeta);

    const ogImageMeta = document.createElement("meta");
    ogImageMeta.setAttribute("property", "og:image");
    ogImageMeta.content = linkData?.imageUrl;
    document.head.appendChild(ogImageMeta);

    // Clean up function to remove old meta tags if they exist
    return () => {
      document.head.removeChild(ogTitleMeta);
      document.head.removeChild(ogDescriptionMeta);
      document.head.removeChild(ogImageMeta);
    };
  }, [linkData]);

  useEffect(() => {
    const receiveMessage = (event: any) => {
      setLinkData(event?.data?.linkData ?? {});
      setBlocks(event?.data?.blocks ?? []);
      setLinkLoading(false);
    };
    window.addEventListener("message", receiveMessage);
    return () => window.removeEventListener("message", receiveMessage);
  }, []);

  return (
    <div
      className="display-link min-h-screen h-full w-full overflow-y-auto"
      style={{
        backgroundColor: linkTheme?.mainBg,
        color: linkTheme?.mainColor,
      }}>
      <div className={`w-full ${!linkLoading ? "" : "flex h-screen"}`}>
        <div className="max-w-3xl relative py-5 w-full flex flex-col gap-2 items-center mx-auto">
          {!linkLoading && (
            <div
              className={`w-full max-w-3xl p-[8px_16px] max-md:max-w-[100%] will-change-transform bg-[#F2F2F2]/50 border border-gray-200 fixed top-0 md:top-3 z-[2] rounded-b-3xl md:rounded-full flex items-center justify-between transition-all duration-300  origin-top   ${
                !isInViewport
                  ? "translate-y-[0px] backdrop-blur-md shadow-xl blur-0"
                  : "translate-y-[-100px]"
              }`}>
              <div className="flex items-center gap-2 text-black">
                <div className="h-12 w-12 rounded-full overflow-hidden object-cover border border-gray-100">
                  <img
                    src={linkData?.imageUrl}
                    className="object-cover h-full w-full blur-0"
                  />
                </div>
                <div className="text-xl capitalize">{linkData?.title}</div>
              </div>
              <div
                onClick={() => {
                  setShareDrawerOpened(true);
                }}
                className="cursor-pointer shadow-lg flex-center rounded-full h-8 w-8">
                <MoreVerticalIcon className="h-5 w-5" />
              </div>
            </div>
          )}
          {/* )} */}
          <div className="flex flex-col gap-8 max-w-[90%] mx-auto text-center">
            {!linkLoading && isInViewport && (
              <div className="fixed right-5  bg-white bottom-8 cursor-pointer block-shadow border flex-center rounded-full h-12 w-12">
                <Share2
                  className="h-5 w-5"
                  onClick={() => {
                    setShareDrawerOpened(true);
                  }}
                />
              </div>
            )}
            <div className="flex flex-col gap-6 items-center">
              <div
                ref={imgElementRef}
                className="h-[100px] w-[100px] rounded-full overflow-hidden">
                {linkLoading ? (
                  <Skeleton className="w-full h-full !bg-gray-300" />
                ) : (
                  <img src={linkData?.imageUrl} />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-center gap-2">
                  {linkLoading ? (
                    <Skeleton className="w-32 h-8 !bg-gray-300" />
                  ) : (
                    <>
                      <div className="text-2xl text-center font-medium">
                        {linkData?.title}
                      </div>
                      {linkData?.is_show_verified_icon && (
                        <div>
                          <img src="/assets/icons/verified-tick.svg" alt="" />
                        </div>
                      )}
                    </>
                  )}
                </div>
                {linkLoading ? (
                  <Skeleton className="w-56 h-4 !bg-gray-300" />
                ) : (
                  <div className="text-base leading-normal font-normal">
                    {linkData?.description}
                  </div>
                )}
              </div>
            </div>
            {/* Social Media Icons */}
            {socials?.length > 0 && linkData?.is_show_social_icons && (
              <div className="flex gap-5 items-center justify-center flex-wrap">
                {socials?.map((ele: any) => {
                  if (isValidUrl(ele?.value)) {
                    return (
                      <a
                        target="_blank"
                        data-tooltip-id={"tooltip"}
                        data-tooltip-content={ele?.key}
                        href={ele?.value}
                        key={ele.value}>
                        {ele?.key == "instagram" && (
                          <Instagram className="h-7 w-7" />
                        )}
                        {ele?.key == "telegram" && (
                          <FaTelegram className="h-7 w-7" />
                        )}
                        {ele?.key == "github" && <Github className="h-7 w-7" />}
                        {ele?.key == "linked_in" && (
                          <Linkedin className="h-7 w-7" />
                        )}
                        {ele?.key == "twitter" && (
                          <FaXTwitter className="h-7 w-7" />
                        )}
                        {ele?.key == "twitch" && <Twitch className="h-7 w-7" />}
                        {ele?.key == "youtube" && (
                          <Youtube className="h-7 w-7" />
                        )}
                        {ele?.key == "facebook" && (
                          <Facebook className="h-7 w-7" />
                        )}
                        {ele?.key == "dribbble" && (
                          <Dribbble className="h-7 w-7" />
                        )}
                        {ele?.key == "slack" && <Slack className="h-7 w-7" />}
                        {ele?.key == "skype" && <FaSkype className="h-7 w-7" />}
                        {ele?.key == "pinterest" && (
                          <FaPinterest className="h-7 w-7" />
                        )}
                        {ele?.key == "tumbler" && (
                          <FaTumblr className="h-7 w-7" />
                        )}
                        {ele?.key == "behance" && (
                          <FaBehance className="h-7 w-7" />
                        )}
                      </a>
                    );
                  }
                })}
              </div>
            )}
          </div>
          <Separator className="divider-bg w-full my-5 h-0.5" />
          <Suspense
            fallback={[1, 2, 3, 4].map((ele: any) => (
              <div key={ele} className="w-full max-w-[90%] mb-4">
                <div className="bg-gray-200 block-shadow rounded-xl w-full py-3 px-4 flex gap-3 items-center">
                  <Skeleton className="!bg-gray-500 rounded-full uppercase text-white h-10 w-10 flex-center" />
                  <div className="flex flex-col gap-1 w-[80%]">
                    <Skeleton className="!bg-gray-500 h-4 w-40"></Skeleton>
                    <Skeleton className="!bg-gray-400 font-medium h-3 w-full md:max-w-[60%] max-w-[80%] truncate"></Skeleton>
                  </div>
                </div>
              </div>
            ))}>
            <div className="w-full flex flex-col gap-2 items-center">
              {!linkLoading &&
                blocks &&
                blocks?.length > 0 &&
                blocks.map((ele: any, i: any) => {
                  if (ele.is_private) return;
                  const itemLink = ele?.link || ele?.url || ele?.val?.link || "#";
                  const itemLabel = ele?.title || ele?.label || ele?.name || ele?.val?.label || "Link";
                  const itemImage = ele?.imageUrl || ele?.image_url || ele?.val?.imageUrl || "";
                  const itemDesc = ele?.description || ele?.desc || ele?.val?.desc || "";

                  return (
                    <div
                      key={(ele?.id || ele?.block_type || "block") + "_" + i}
                      onClick={() => {
                        if (
                          !window.location.href.includes("dHlwZT1wcmV2aWV3") &&
                          !["text", "divider"].includes(ele.block_type)
                        ) {
                          handleBlockClick(ele);
                        }
                      }}
                      className={`w-full max-w-[90%] ${
                        ele?.block_type != "text" ? "mb-4" : ""
                      }`}>
                      {(ele?.block_type === "simple_link" || ele?.block_type === "link" || !ele?.block_type) && (
                        <SimpleLink
                          link={itemLink}
                          label={itemLabel}
                          imageUrl={itemImage}
                          linkTheme={linkTheme}
                        />
                      )}
                      {ele?.block_type === "github_repo_card" && (
                        <GithubRepoCard
                          link={itemLink}
                          name={itemLabel}
                          desc={itemDesc}
                          tags={ele?.val?.tags || []}
                          linkTheme={linkTheme}
                        />
                      )}
                      {ele?.block_type === "text" && (
                        <Text
                          text={ele?.text || ele?.val?.text || itemLabel}
                          align={ele?.align || ele?.val?.align || "center"}
                          linkTheme={linkTheme}
                        />
                      )}
                      {ele?.block_type == "divider" && (
                        <Separator className="divider-bg w-full" />
                      )}
                      {ele?.block_type == "github_contributions" && (
                        <GitHubContributions
                          username={ele?.val?.username}
                          linkTheme={linkTheme}
                        />
                      )}
                      {ele?.block_type == "github_card" && (
                        <GitHubProfileCard
                          username={ele?.val?.username}
                          linkTheme={linkTheme}
                        />
                      )}
                    </div>
                  );
                })}
              {linkLoading &&
                [1, 2, 3, 4].map((ele: any) => (
                  <div key={ele} className="w-full max-w-[90%] mb-4">
                    <div
                      style={{ background: linkTheme?.mainBg }}
                      className=" block-shadow rounded-xl w-full py-3 px-4 flex gap-3 items-center">
                      <Skeleton className="!bg-gray-500 rounded-full uppercase text-white h-10 w-10 flex-center" />
                      <div className="flex flex-col gap-1 w-[80%]">
                        <Skeleton className="!bg-gray-500 h-4 w-40"></Skeleton>
                        <Skeleton className="!bg-gray-400 font-medium h-3 w-full md:max-w-[60%] max-w-[80%] truncate"></Skeleton>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Suspense>
          {linkData?.is_show_watermark && (
            <a href={appConfig?.baseUrl} target="_blank">
              <Button className="flex gap-2 !shadow-xl border-y border-y-slate-900 bg-gray-50 text-slate-900 hover:bg-gray-100 !py-6 mx-auto mb-4">
                Powered by
                <img src="/assets/images/logo.png" className="h-5 w-5" />
                {appConfig.appName}
              </Button>
            </a>
          )}
        </div>
      </div>
      <ShareDrawer
        linkData={linkData}
        shareDrawerOpened={shareDrawerOpened}
        setShareDrawerOpened={setShareDrawerOpened}
      />
    </div>
  );
};

export default DisplayLink;
