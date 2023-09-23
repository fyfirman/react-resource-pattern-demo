import {
  useMemo,
  useState,
  useCallback,
  useImperativeHandle,
  Ref,
  forwardRef,
} from "react";
import {
  QueryObserverResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { Response } from "~/interfaces/response";
import Layout from "~/components/resource/layout";
import DynamicTable, {
  DynamicTableCol,
} from "~/components/resource/dynamic-table";
import DeletePromptDialog from "~/components/resource/delete-promp-dialog";
import { ZodType, z } from "zod";
import { FieldValues, UseFormReturn } from "react-hook-form";
import AddEditResourceDialog from "~/components/resource/add-edit-resource-dialog";
import TableSkeleton from "~/components/resource/table-skeleton";

interface Model {
  id: string;
}

export interface ResourceRenderProps<T extends FieldValues> {
  form: UseFormReturn<T>;
}

export interface ResourceAddEditProps<T extends ZodType = ZodType> {
  validationSchema: T;
  initialValue: z.infer<T>;
  render: (props: ResourceRenderProps<z.infer<T>>) => React.ReactNode;
  excludedInitialKey?: string[];
}

export interface ResourceAddProps<T extends ZodType = ZodType>
  extends ResourceAddEditProps<T> {
  service: (body: z.infer<T>) => Promise<Response<z.infer<T>>>;
}
export interface ResourceEditProps<T extends ZodType = ZodType>
  extends ResourceAddEditProps<T> {
  service: (id: string, body: z.infer<T>) => Promise<Response<z.infer<T>>>;
}

export interface ResourceRef<T> {
  refetchRead: () => Promise<QueryObserverResult<Response<T[]>, unknown>>;
}

export type TableColumns<T> = (
  onEdit: (value: T) => void,
  onDelete: (value: T) => void
) => DynamicTableCol<T>[];

interface ResourceProps<BaseModel, ResourceRow, FilterModel = unknown> {
  title: string;
  serviceKey: string;
  getRows?: (item: BaseModel) => ResourceRow;
  tableColumns: TableColumns<ResourceRow>;
  getServices: (filter?: FilterModel) => Promise<Response<BaseModel[]>>;
  DeleteProps?: {
    service: (id: string) => Promise<Response<BaseModel>>;
    label: (item: ResourceRow) => string;
    deleteText?: string;
    cancelText?: string;
  };
  AddProps?: ResourceAddProps;
  EditProps?: ResourceEditProps;
  ref?: Ref<ResourceRef<BaseModel>>;
}

const Resource = forwardRef(
  <T, R extends Model, F extends Model>(
    props: ResourceProps<T, R, F>,
    forwardedRef: Ref<ResourceRef<T>>
  ) => {
    const {
      title,
      serviceKey,
      getServices,
      getRows,
      tableColumns,
      DeleteProps,
      AddProps,
      EditProps,
    } = props;

    type ResourceRow = typeof getRows extends undefined ? T : R;

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedResource, setSelectedResource] = useState<ResourceRow>();
    const resourceQuery = useQuery({
      queryKey: [serviceKey],
      queryFn: async () => {
        const result = await getServices();
        return result;
      },
    });

    const deleteMutation = useMutation(
      ["delete", serviceKey],
      async () => {
        if (!DeleteProps) {
          return Promise.resolve({
            statusCode: 400,
            data: {},
            message: "Something went wrong.",
          });
        }
        return DeleteProps.service(selectedResource?.id ?? "");
      },
      {
        onSuccess: async () => {
          await resourceQuery.refetch();
          setOpenDeleteDialog(false);
        },
      }
    );

    const handleDeleteSubmit = useCallback(() => {
      deleteMutation.mutate();
    }, []);

    const rows: ResourceRow[] = useMemo(() => {
      if (!resourceQuery.data) {
        return [];
      }

      if (!getRows) {
        return resourceQuery.data.data as unknown as R[];
      }

      return resourceQuery.data.data.map(getRows);
    }, [resourceQuery.data]);

    useImperativeHandle(
      forwardedRef,
      () => ({
        refetchRead: () => resourceQuery.refetch(),
      }),
      [forwardedRef]
    );

    const handleEdit = (row: ResourceRow) => {
      setSelectedResource(row);
      setOpenEditDialog(true);
    };

    const handleDelete = (row: ResourceRow) => {
      setSelectedResource(row);
      setOpenDeleteDialog(true);
    };

    return (
      <>
        <Layout
          hideButton={!AddProps}
          onClickButton={() => setOpenAddDialog(true)}
          title={title}
        >
          <div className="flex flex-col gap-6 mt-4 rounded-md border">
            {!resourceQuery.isFetching ? (
              <DynamicTable<ResourceRow>
                columns={tableColumns(handleEdit, handleDelete)}
                rows={rows}
              />
            ) : (
              <TableSkeleton />
            )}
          </div>
        </Layout>
        {AddProps ? (
          <AddEditResourceDialog
            onOpenChange={setOpenAddDialog}
            onSuccess={() => resourceQuery.refetch()}
            open={openAddDialog}
            serviceKey={serviceKey}
            title={title}
            {...AddProps}
          />
        ) : null}
        {selectedResource ? (
          <>
            {EditProps ? (
              <AddEditResourceDialog
                data={selectedResource}
                onOpenChange={setOpenEditDialog}
                onSuccess={() => resourceQuery.refetch()}
                open={openEditDialog}
                serviceKey={serviceKey}
                title={title}
                {...EditProps}
              />
            ) : null}
            {DeleteProps ? (
              <DeletePromptDialog
                cancelText={DeleteProps.cancelText}
                deleteText={DeleteProps.deleteText}
                onClose={() => setOpenDeleteDialog(false)}
                onOpenChange={setOpenDeleteDialog}
                onSubmit={handleDeleteSubmit}
                open={openDeleteDialog}
                title={DeleteProps.label(selectedResource)}
              />
            ) : null}
          </>
        ) : null}
      </>
    );
  }
);

export default Resource as <T, R extends Model, F = unknown>(
  props: ResourceProps<T, R, F>,
  forwardedRef: Ref<ResourceRef<T>>
) => JSX.Element;
