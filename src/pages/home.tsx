import "~/App.css";
import { Button } from "~/components/ui/button";
import Resource from "~/components/resource/resource";
import { DynamicTableCol } from "~/components/resource/dynamic-table";
import { User } from "~/interfaces/user";
import userService from "~/services/user-service";

interface UserRow extends User {}

function Home() {
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

export default Home;
