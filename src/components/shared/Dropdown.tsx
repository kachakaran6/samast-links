import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  //   DropdownMenuGroup,
  // DropdownMenuItem,
  DropdownMenuLabel,
  //   DropdownMenuPortal,
  // DropdownMenuSeparator,
  //   DropdownMenuShortcut,
  //   DropdownMenuSub,
  //   DropdownMenuSubContent,
  //   DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

export function Dropdown({ menuOpen, menuLabel, children }: any) {
  return (
    <DropdownMenu open={menuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"link"}
          size={"icon"}
          className="border border-transparent focus:border-dark-4 rounded-full text-sm">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {menuLabel && <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>}
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
