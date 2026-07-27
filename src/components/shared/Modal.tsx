import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader } from ".";

export default function Modal({
  children,
  btnLabel,
  label,
  desc,
  hideActions,
  submitBtnLabel,
  closeBtnLabel = "cancel",
  variant,
  onSubmit,
  open,
  setOpen,
  isSubmitLoading = false,
  loadingText = "Loading...",
  submitBtnClass = "",
  cancelBtnClass = "",
}: any) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {btnLabel && (
        <DialogTrigger asChild>
          <Button className="shad-button_primary">{btnLabel}</Button>
        </DialogTrigger>
      )}
      <DialogContent className="shad-dialog">
        <DialogHeader>
          {label && <DialogTitle>{label}</DialogTitle>}
          {desc && <DialogDescription>{desc}</DialogDescription>}
        </DialogHeader>
        {children && <div className="grid gap-4 pt-4">{children}</div>}
        {!hideActions && (
          <DialogFooter className="dialog-footer">
            {closeBtnLabel && (
              <DialogClose asChild>
                <Button variant="secondary" className={cancelBtnClass}>
                  {closeBtnLabel}
                </Button>
              </DialogClose>
            )}
            <Button
              onClick={() => {
                onSubmit();
              }}
              autoFocus
              className={
                variant == "danger"
                  ? "shad-button_danger"
                  : "shad-button_primary" + ` ${submitBtnClass}`
              }>
              {isSubmitLoading ? (
                <div className="flex-center gap-2 whitespace-nowrap">
                  <Loader height={20} width={20} /> {loadingText}
                </div>
              ) : (
                submitBtnLabel
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
