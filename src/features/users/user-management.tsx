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
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import { useMutation } from "@tanstack/react-query";

interface UserRow extends User {}

function UserManagement() {
  const updateStatusMutation = useMutation(["user"], (payload) =>
    userService.updateUser(payload.id, payload)
  );
  const resourceRef = useRef();

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
        <Button
          className="flex items-center"
          onClick={async () => {
            await updateStatusMutation.mutateAsync({
              ...row,
              status: row.status === "active" ? "inactive" : "active",
            });

            await resourceRef.current?.refetchRead();
          }}
          variant="secondary"
        >
          {row.status === "active" ? (
            <CheckCircledIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          ) : (
            <CrossCircledIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{toPascalCase(row.status)}</span>
        </Button>
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
      ref={resourceRef}
      serviceKey="user"
      tableColumns={tableColumns}
      title="User"
    />
  );
}

export default UserManagement;
