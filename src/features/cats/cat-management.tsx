import Resource, {
  ResourceAddProps,
  ResourceEditProps,
  TableColumns,
} from "~/components/resource/resource";
import { RowActions } from "~/components/resource/row-action";
import catService, { catCreateSchema } from "~/features/cats/cat.service";
import CatCreateDialog, {
  initialValue,
} from "~/features/cats/cat-create-dialog";
import { Cat } from "~/features/cats/cat.interface";
import { formatDate } from "~/libs/string-helper";

interface CatRow extends Omit<Cat, "birthDate"> {
  birthDate: Date;
}

const tableColumns: TableColumns<CatRow> = (onEdit, onDelete) => [
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

function CatManagement() {
  return (
    <Resource<Cat, CatRow>
      AddProps={
        {
          validationSchema: catCreateSchema,
          service: catService.createCat,
          initialValue,
          render: CatCreateDialog,
        } satisfies ResourceAddProps<typeof catCreateSchema>
      }
      DeleteProps={{
        service: catService.deleteById,
        label: (item) => `Delete ${item.name}`,
      }}
      EditProps={
        {
          validationSchema: catCreateSchema,
          service: catService.updateCat,
          initialValue,
          render: CatCreateDialog,
        } satisfies ResourceEditProps<typeof catCreateSchema>
      }
      getRows={(item) => ({ ...item, birthDate: new Date(item.birthDate) })}
      getServices={() => catService.getCats()}
      serviceKey="cat"
      tableColumns={tableColumns}
      title="Cat"
    />
  );
}

export default CatManagement;
