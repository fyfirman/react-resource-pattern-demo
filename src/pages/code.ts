export const userManagement = `import Resource, {
  ResourceAddEditProps,
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
        label: (item) => \`Delete \${item.name}\`,
      }}
    />
  );
}

export default UserManagement;

`;

export const companyManagement = `import Resource, {
  ResourceAddEditProps,
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
        } satisfies ResourceAddEditProps<typeof companyCreateSchema>
      }
      DeleteProps={{
        service: companyService.deleteById,
        label: (item) => \`Delete \${item.name}\`,
      }}
      EditProps={
        {
          validationSchema: companyCreateSchema,
          service: companyService.createCompany,
          initialValue,
          render: CompanyCreateDialog,
        } satisfies ResourceAddEditProps<typeof companyCreateSchema>
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
  ResourceAddEditProps,
  TableColumns,
} from "~/components/resource/resource";
import { RowActions } from "~/components/resource/row-action";
import catService, { catCreateSchema } from "~/features/cats/cat.service";
import CatCreateDialog, {
  initialValue,
} from "~/features/cats/cat-create-dialog";
import { Cat } from "~/features/cats/cat.interface";
import { formatDate } from "~/libs/string-helper";

interface CatRow extends Cat {}

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
      return formatDate(new Date(value.birthDate));
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
        } satisfies ResourceAddEditProps<typeof catCreateSchema>
      }
      DeleteProps={{
        service: catService.deleteById,
        label: (item) => \`Delete \${item.name}\`,
      }}
      EditProps={
        {
          validationSchema: catCreateSchema,
          service: catService.createCat,
          initialValue,
          render: CatCreateDialog,
        } satisfies ResourceAddEditProps<typeof catCreateSchema>
      }
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
  ResourceAddEditProps,
  TableColumns,
} from "~/components/resource/resource";
import { RowActions } from "~/components/resource/row-action";
import dogService, { dogCreateSchema } from "~/features/dogs/dog.service";
import DogCreateDialog, {
  initialValue,
} from "~/features/dogs/dog-create-dialog";
import { Dog } from "~/features/dogs/dog.interface";
import { formatDate } from "~/libs/string-helper";

interface DogRow extends Dog {}

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
      return formatDate(new Date(value.birthDate));
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
        } satisfies ResourceAddEditProps<typeof dogCreateSchema>
      }
      DeleteProps={{
        service: dogService.deleteById,
        label: (item) => \`Delete \${item.name}\`,
      }}
      EditProps={
        {
          validationSchema: dogCreateSchema,
          service: dogService.createDog,
          initialValue,
          render: DogCreateDialog,
        } satisfies ResourceAddEditProps<typeof dogCreateSchema>
      }
      getServices={() => dogService.getDogs()}
      serviceKey="dog"
      tableColumns={tableColumns}
      title="Dog"
    />
  );
}

export default DogManagement;

`;
