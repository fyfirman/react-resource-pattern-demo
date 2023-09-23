import { z } from "zod";
import { ResourceRenderProps } from "~/components/resource/resource";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { dogCreateSchema } from "~/features/dogs/dog.service";

export const initialValue: z.infer<typeof dogCreateSchema> = {
  name: "",
  birthDate: new Date(),
  breed: "",
  sex: "male",
};

const DogCreateDialog = (
  props: ResourceRenderProps<z.infer<typeof dogCreateSchema>>
) => {
  const { form } = props;

  return (
    <>
      <FormField
        control={form.control}
        name="breed"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Breed</FormLabel>
            <FormControl>
              <Input placeholder="John doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="John doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="sex"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sex</FormLabel>
            <FormControl>
              <Input placeholder="63966 Louvenia Turnpike" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="birthDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Birth Date</FormLabel>
            <FormControl>
              <Input placeholder="479.378.0957" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <DialogFooter>
        <Button
          disabled={
            !form.formState.isDirty ||
            !form.formState.isValid ||
            form.formState.isLoading
          }
          type="submit"
        >
          Save
        </Button>
      </DialogFooter>
    </>
  );
};

export default DogCreateDialog;
