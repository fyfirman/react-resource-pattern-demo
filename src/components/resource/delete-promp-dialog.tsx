import { useCallback } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

interface DeletePromptDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onClose: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
  title: string;
  children?: React.ReactNode;
  deleteText?: string;
  cancelText?: string;
}

const DeletePromptDialog = (props: DeletePromptDialogProps) => {
  const {
    onClose,
    onCancel,
    open,
    onOpenChange,
    onSubmit,
    title,
    children,
    deleteText = "Delete",
    cancelText = "Cancel",
  } = props;

  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
    if (onClose) onClose();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure to make this changes? This changes is irreversible
        </DialogDescription>
        {children}
        <DialogFooter>
          <Button variant="ghost" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button color="secondary" onClick={onSubmit}>
            {deleteText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePromptDialog;
