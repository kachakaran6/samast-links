import { Drawer, DrawerContent } from "@/components/ui/drawer";

const CustomDrawer = ({ openChanged, className, open, children }: any) => {
  return (
    <Drawer onOpenChange={openChanged} open={open}>
      <DrawerContent className={className}>{children}</DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
