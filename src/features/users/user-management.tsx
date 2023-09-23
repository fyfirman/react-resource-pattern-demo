import "~/App.css";
import { Button } from "~/components/ui/button";
import Resource, {
  ResourceAddEditProps,
  TableColumns,
} from "~/components/resource/resource";
import { User } from "~/features/users/user.interface";
import userService, { userCreateSchema } from "~/features/users/user.service";
import UserCreateDialog, {
  initialValue,
} from "~/features/users/user-create-dialog";

interface UserRow extends User {}

const tableColumns: TableColumns<UserRow> = (onEdit, onDelete) => [
  {
    field: "createdAt",
    headerName: "Registered at",
  },
  { field: "name", headerName: "Name" },
  { field: "phoneNumber", headerName: "Phone Number" },
  { field: "address", headerName: "Address" },
  { field: "status", headerName: "Status" },
  {
    field: "action",
    headerName: "",
    renderCell: (value) => (
      <div className="flex gap-1">
        <Button onClick={() => onEdit(value)}>Edit</Button>
        <Button onClick={() => onDelete(value)}>Delete</Button>
      </div>
    ),
  },
];

function UserManagement() {
  return (
    <Resource<User, UserRow>
      title="User"
      serviceKey="user"
      getServices={() => userService.getUsers()}
      tableColumns={tableColumns}
      AddProps={
        {
          validationSchema: userCreateSchema,
          service: userService.createUser,
          initialValue: initialValue,
          render: UserCreateDialog,
        } satisfies ResourceAddEditProps<typeof userCreateSchema>
      }
      EditProps={
        {
          validationSchema: userCreateSchema,
          service: userService.createUser,
          initialValue: initialValue,
          render: UserCreateDialog,
        } satisfies ResourceAddEditProps<typeof userCreateSchema>
      }
      DeleteProps={{
        service: userService.deleteById,
        label: (item) => `Are you sure to delete ${item.name} ?`,
      }}
    />
  );
}

export default UserManagement;
