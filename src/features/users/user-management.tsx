import "~/App.css";
import { Button } from "~/components/ui/button";
import Resource from "~/components/resource/resource";
import { DynamicTableCol } from "~/components/resource/dynamic-table";
import { User } from "~/features/users/user.interface";
import userService, { userCreateSchema } from "~/features/users/user.service";
import UserCreateDialog, {
  initialValue,
} from "~/features/users/user-create-dialog";

interface UserRow extends User {}

function UserManagement() {
  return (
    <Resource<User, UserRow>
      title="User Management"
      serviceKey="user"
      getServices={() => userService.getUsers()}
      getColumns={(onEdit, onDelete): DynamicTableCol[] => [
        {
          field: "createdAt",
          headerName: "Registered at",
          renderCell: (value) => `${value.getValue("createdAt")}`,
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
      ]}
      getRows={(item) => item}
      AddProps={{
        service: userService.createUser,
        initialValue: initialValue,
        validationSchema: userCreateSchema,
        render: UserCreateDialog,
      }}
      DeleteProps={{
        service: userService.deleteById,
        label: (item) => `Are you sure to delete ${item.name} ?`,
      }}
    />
  );
}

export default UserManagement;
