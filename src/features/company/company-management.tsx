import Resource, {
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
        label: (item) => `Delete ${item.name}`,
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
