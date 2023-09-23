export const userManagement = `import Resource, {
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
        label: (item) => \`Delete \${item.name}\`,
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
`;

export const companyManagement = `import Resource, {
  ResourceAddProps,
  ResourceEditProps,
  TableColumns,
} from "~/components/resource/resource";
import companyService, {
  companyCreateSchema,
} from "~/features/company/company.service";
import CompanyCreateDialog, {
  initialValue,
} from "~/features/company/company-create-dialog";
import { RowActions } from "~/components/resource/row-action";
import { Company } from "~/features/company/company.interface";

interface CompanyRow extends Company {}

const tableColumns: TableColumns<CompanyRow> = (onEdit, onDelete) => [
  {
    field: "id",
    headerName: "ID",
  },
  { field: "name", headerName: "Name" },
  { field: "phoneNumber", headerName: "Phone Number" },
  { field: "city", headerName: "City" },
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

function CompanyManagement() {
  return (
    <Resource<Company, CompanyRow>
      AddProps={
        {
          validationSchema: companyCreateSchema,
          service: companyService.createCompany,
          initialValue,
          render: CompanyCreateDialog,
        } satisfies ResourceAddProps<typeof companyCreateSchema>
      }
      DeleteProps={{
        service: companyService.deleteById,
        label: (item) => \`Delete \${item.name}\`,
      }}
      EditProps={
        {
          validationSchema: companyCreateSchema,
          service: companyService.updateCompany,
          initialValue,
          render: CompanyCreateDialog,
        } satisfies ResourceEditProps<typeof companyCreateSchema>
      }
      getServices={() => companyService.getCompanies()}
      serviceKey="company"
      tableColumns={tableColumns}
      title="Company"
    />
  );
}

export default CompanyManagement;
`;

export const catManagement = `import Resource, {
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
        label: (item) => \`Delete \${item.name}\`,
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
`;

export const dogManagement = `import Resource, {
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
        label: (item) => \`Delete \${item.name}\`,
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
`;
