import { memo } from "react";
// import { useNotification } from "@context/NotificationContext";
import { useMutation } from "@tanstack/react-query";
import { Response } from "~/interfaces/response";
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { UseFormReturn, useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";

interface AddResourceDialogProps<T extends ZodSchema> {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  serviceKey: string;
  title: string;
  onSuccess: () => void;
  service: <Body>(body: Body) => Promise<Response<T>>;
  initialValue: z.infer<T>;
  validationSchema: T;
  render: (props: { form: UseFormReturn<T> }) => React.ReactNode;
}

const AddResourceDialog = <T extends ZodSchema>(
  props: AddResourceDialogProps<T>
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
    ...rest
  } = props;

  const resourceMutation = useMutation([serviceKey], service);
  // const notification = useNotification();
  const form = useForm<T>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValue,
  });

  const handleSubmit = async (value: z.infer<typeof validationSchema>) => {
    await resourceMutation.mutateAsync(value);

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...rest}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {render({ form })}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(AddResourceDialog);
