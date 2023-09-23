import "~/App.css";
import { Button } from "~/components/ui/button";
import Resource from "~/components/resource/resource";
import { DynamicTableCol } from "~/components/resource/dynamic-table";
import { User } from "~/features/users/user.interface";
import userService from "~/features/users/user.service";

interface UserRow extends User {}

function UserManagement() {
  return (
    <Resource<User, UserRow>
      title="User Management"
      serviceKey="user"
      getServices={() => userService.getUsers()}
      getColumns={(): DynamicTableCol[] => [
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
          renderCell: (value) => <Button onClick={() => {}}>Delete</Button>,
        },
      ]}
      getRows={(item) => item}
    />
  );
}

export default UserManagement;
