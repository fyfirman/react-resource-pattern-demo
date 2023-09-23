import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { ResourceRenderProps } from "~/components/resource/resource";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { DialogFooter } from "~/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/utils";

interface InitialCatValues {
  name: string;
  breed: string;
  birthDate?: Date;
  sex?: "male" | "female";
}

export const initialValue: InitialCatValues = {
  name: "",
  birthDate: undefined,
  breed: "",
  sex: undefined,
};

const CatCreateDialog = (props: ResourceRenderProps<InitialCatValues>) => {
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
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="birthDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date of birth</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                    variant="outline"
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                  mode="single"
                  onSelect={field.onChange}
                  selected={field.value}
                />
              </PopoverContent>
            </Popover>
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

export default CatCreateDialog;
