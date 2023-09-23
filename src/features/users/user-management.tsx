import Resource, {
  ResourceAddProps,
  ResourceEditProps,
  TableColumns,
} from "~/components/resource/resource";
import { User } from "~/features/users/user.interface";
import userService, { userCreateSchema } from "~/features/users/user.service";
import UserCreateDialog, {
  initialValue,
} from "~/features/users/user-create-dialog";
import { RowActions } from "~/components/resource/row-action";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { formatDate, toPascalCase } from "~/libs/string-helper";

interface UserRow extends User {}

const tableColumns: TableColumns<UserRow> = (onEdit, onDelete) => [
  {
    field: "createdAt",
    headerName: "Registered at",
    renderCell(value) {
      return formatDate(new Date(value.createdAt));
    },
  },
  { field: "name", headerName: "Name" },
  { field: "phoneNumber", headerName: "Phone Number" },
  { field: "address", headerName: "Address" },
  {
    field: "status",
    headerName: "Status",
    renderCell: (row) => (
      <div className="flex items-center">
        {row.status === "active" ? (
          <CheckCircledIcon className="mr-2 h-4 w-4 text-muted-foreground" />
        ) : (
          <CrossCircledIcon className="mr-2 h-4 w-4 text-muted-foreground" />
        )}
        <span>{toPascalCase(row.status)}</span>
      </div>
    ),
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

function UserManagement() {
  return (
    <Resource<User, UserRow>
      AddProps={
        {
          validationSchema: userCreateSchema,
          service: userService.createUser,
          initialValue,
          render: UserCreateDialog,
        } satisfies ResourceAddProps<typeof userCreateSchema>
      }
      DeleteProps={{
        service: userService.deleteById,
        label: (item) => `Delete ${item.name}`,
      }}
      EditProps={
        {
          validationSchema: userCreateSchema,
          service: userService.updateUser,
          initialValue,
          render: UserCreateDialog,
        } satisfies ResourceEditProps<typeof userCreateSchema>
      }
      getServices={() => userService.getUsers()}
      serviceKey="user"
      tableColumns={tableColumns}
      title="User"
    />
  );
}

export default UserManagement;
