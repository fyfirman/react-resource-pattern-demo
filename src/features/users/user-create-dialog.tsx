import { z } from "zod";
import { ResourceRenderProps } from "~/components/resource/resource";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { userCreateSchema } from "~/features/users/user.service";

export const initialValue: z.infer<typeof userCreateSchema> = {
  name: "",
  address: "",
  phoneNumber: "",
};

const UserCreateDialog = (
  props: ResourceRenderProps<z.infer<typeof userCreateSchema>>
) => {
  const { form } = props;

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="John doe" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input placeholder="63966 Louvenia Turnpike" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="479.378.0957" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <DialogFooter>
        <Button
          type="submit"
          disabled={
            !form.formState.isDirty ||
            !form.formState.isValid ||
            form.formState.isLoading
          }
        >
          Save
        </Button>
      </DialogFooter>
    </>
  );
};

export default UserCreateDialog;
