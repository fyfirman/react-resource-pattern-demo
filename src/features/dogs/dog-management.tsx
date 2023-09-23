import Resource, {
  ResourceAddProps,
  ResourceEditProps,
  TableColumns,
} from "~/components/resource/resource";
import { RowActions } from "~/components/resource/row-action";
import dogService, { dogCreateSchema } from "~/features/dogs/dog.service";
import DogCreateDialog, {
  initialValue,
} from "~/features/dogs/dog-create-dialog";
import { Dog } from "~/features/dogs/dog.interface";
import { formatDate } from "~/libs/string-helper";

interface DogRow extends Omit<Dog, "birthDate"> {
  birthDate: Date;
}

const tableColumns: TableColumns<DogRow> = (onEdit, onDelete) => [
  {
    field: "id",
    headerName: "ID",
  },
  { field: "breed", headerName: "Breed" },
  { field: "name", headerName: "Name" },
  {
    field: "sex",
    headerName: "Sex",
    renderCell(value) {
      if (value.sex === "male") {
        return "Male";
      }

      return "Female";
    },
  },
  {
    field: "birthDate",
    headerName: "Birth Date",
    renderCell(value) {
      return formatDate(value.birthDate);
    },
  },
  {
    field: "action",
    headerName: "",
    renderCell: (value) => (
      <RowActions
        onDelete={() => onDelete(value)}
        onEdit={() => onEdit(value)}
      />
    ),
  },
];

function DogManagement() {
  return (
    <Resource<Dog, DogRow>
      AddProps={
        {
          validationSchema: dogCreateSchema,
          service: dogService.createDog,
          initialValue,
          render: DogCreateDialog,
        } satisfies ResourceAddProps<typeof dogCreateSchema>
      }
      DeleteProps={{
        service: dogService.deleteById,
        label: (item) => `Delete ${item.name}`,
      }}
      EditProps={
        {
          validationSchema: dogCreateSchema,
          service: dogService.updateDog,
          initialValue,
          render: DogCreateDialog,
        } satisfies ResourceEditProps<typeof dogCreateSchema>
      }
      getRows={(item) => ({ ...item, birthDate: new Date(item.birthDate) })}
      getServices={() => dogService.getDogs()}
      serviceKey="dog"
      tableColumns={tableColumns}
      title="Dog"
    />
  );
}

export default DogManagement;
