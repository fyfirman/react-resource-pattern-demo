import { memo, useMemo } from "react";
// import { useNotification } from "@context/NotificationContext";
import { useMutation } from "@tanstack/react-query";
import { Response } from "~/interfaces/response";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { UseFormReturn, useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";

interface AddEditResourceDialogProps<T extends ZodSchema, D = any> {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  serviceKey: string;
  title: string;
  onSuccess: () => Promise<any>;
  service:
    | (<Body>(id: string, body: Body) => Promise<Response<T>>)
    | (<Body>(body: Body) => Promise<Response<T>>);
  initialValue: z.infer<T>;
  validationSchema: T;
  render: (props: { form: UseFormReturn<T> }) => React.ReactNode;
  data?: D;
}

const AddEditResourceDialog = <T extends ZodSchema>(
  props: AddEditResourceDialogProps<T>
) => {
  const {
    open,
    onOpenChange,
    serviceKey,
    service,
    title,
    initialValue,
    validationSchema,
    render,
    onSuccess,
    data,
    ...rest
  } = props;

  const defaultValues = useMemo(() => {
    if (!data) {
      return initialValue;
    }
    return data;
  }, [initialValue, data]);

  const resourceMutation = useMutation([serviceKey], (payload) =>
    !data ? service(payload) : service(data.id, payload)
  );

  const form = useForm<T>({
    resolver: zodResolver(validationSchema),
    values: defaultValues,
  });

  const handleSubmit = async (value: z.infer<typeof validationSchema>) => {
    await resourceMutation.mutateAsync(value);
    await onSuccess();
    onOpenChange(false);
  };

  const titleLabel = !data ? "Add" : "Edit";

  return (
    <Dialog onOpenChange={onOpenChange} open={open} {...rest}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {titleLabel} {title}
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {render({ form })}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(AddEditResourceDialog);
