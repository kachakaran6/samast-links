import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui";

const CustomSheet = ({
  children,
  title,
  desc,
  btnText,
  isShowCloseBtn,
  closeBtnText,
  side,
  isOpen,
  onToggle,
  drawerClass,
  headerClass,
  titleCLass,
}: any) => {
  return (
    <Sheet open={isOpen} onOpenChange={onToggle}>
      {btnText && (
        <SheetTrigger asChild>
          <Button variant="outline">{btnText}</Button>
        </SheetTrigger>
      )}
      <SheetContent side={side} className={`${drawerClass} !p-0 z-[99]`}>
        <SheetHeader className={`p-3 ${headerClass}`}>
          {title && (
            <SheetTitle className={`${titleCLass}`}>{title}</SheetTitle>
          )}
          {desc && <SheetDescription>{desc}</SheetDescription>}
        </SheetHeader>
        {children}
        <SheetFooter>
          <SheetClose asChild>
            {isShowCloseBtn && <Button type="submit">{closeBtnText}</Button>}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;
