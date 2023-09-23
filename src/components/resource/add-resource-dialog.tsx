import { StyledDialog, StyledDialogTitle } from "acceleration-ui";
import { DialogProps } from "@material-ui/core";
import { Formik } from "formik";
import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
// import { useNotification } from "@context/NotificationContext";
import { useMutation } from "@tanstack/react-query";
import { Response } from "~/interfaces/response";

interface AddResourceDialogProps<T> {
  open: boolean;
  onClose: () => void;
  serviceKey: string;
  title: string;
  onSuccess: () => void;
  service: <Body>(body: Body) => Promise<Response<T>>;
  initialValue: any;
  validationSchema: any;
  render: (props: {
    isValid: boolean;
    dirty: boolean;
    isLoading: boolean;
    setAdditionalImages: Dispatch<SetStateAction<IAdditionalImage>>;
    setAdditionalImageKeys: Dispatch<SetStateAction<string[]>>;
  }) => React.ReactNode;
}

interface IAdditionalImage {
  [key: string]: File;
}

const AddResourceDialog = <T,>(props: AddResourceDialogProps<T>) => {
  const {
    open,
    onClose,
    serviceKey,
    service,
    title,
    initialValue,
    validationSchema,
    render,
    onSuccess,
    ...rest
  } = props;

  const resourceMutation = useMutation(serviceKey, service);
  // const notification = useNotification();
  const [additionalImages, setAdditionalImages] = useState<IAdditionalImage>(
    {}
  );
  const [additionalImageKeys, setAdditionalImageKeys] = useState<string[]>([]);

  const handleSubmit = useCallback(
    (value: any) => {
      const invalidImageKey: string[] = [];
      additionalImageKeys.forEach((key) => {
        if (!(additionalImages[key] instanceof File)) {
          invalidImageKey.push(key);
        }
      });

      if (invalidImageKey.length !== 0) {
        const message = `${invalidImageKey.join(", ")} is invalid`;
        // notification.show(message, "error");
        return;
      }

      resourceMutation
        .mutateAsync({ ...value, ...additionalImages })
        .then((data) => {
          onSuccess();
          handleClose();
          // notification.show(data.message);
        });
      // .catch(notification.default.error);
    },
    [additionalImages, additionalImageKeys]
  );

  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, []);

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      {...rest}
    >
      <StyledDialogTitle>Add {title}</StyledDialogTitle>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid, dirty }) =>
          render({
            isValid,
            dirty,
            isLoading: resourceMutation.isLoading,
            setAdditionalImages,
            setAdditionalImageKeys,
          })
        }
      </Formik>
    </StyledDialog>
  );
};

export default memo(AddResourceDialog);
