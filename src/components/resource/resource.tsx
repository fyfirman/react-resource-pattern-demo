import {
  useMemo,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useImperativeHandle,
  Ref,
  forwardRef,
} from "react";
// import { useNotification } from "@context/NotificationContext";
import {
  QueryObserverResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
// import AddResourceDialog from "./Dialog/AddResourceDialog";
// import EditResourceDialog from "./Dialog/EditResourceDialog";
// import FilterSection, { FilterSectionProps } from "./components/FilterSection";
import { Skeleton } from "~/components/ui/skeleton";
import { Response } from "~/interfaces/response";
import Layout from "~/components/resource/layout";
import { toPascalCase } from "~/libs/string-helper";
import DynamicTable, {
  DynamicTableCol,
  DynamicTableParams,
} from "~/components/resource/dynamic-table";
import DeletePromptDialog from "~/components/resource/delete-promp-dialog";
import AddResourceDialog from "~/components/resource/add-resource-dialog";
import { ZodObject, ZodRawShape, ZodSchema, z } from "zod";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface Model {
  id: string;
}

export interface ResourceRenderProps<T extends FieldValues> {
  form: UseFormReturn<T>; // todo
}

export interface ResourceAddEditProps<T extends ZodObject<any>> {
  service: (body: z.infer<T>) => Promise<Response<z.infer<T>>>;
  initialValue: z.infer<T>;
  validationSchema: T;
  render: (props: ResourceRenderProps<T>) => React.ReactNode;
  excludedInitialKey?: string[];
}

export interface ResourceRef<T> {
  refetchRead: () => Promise<QueryObserverResult<Response<T[]>, unknown>>;
}

// T: IAdmin
interface ResourceProps<
  BaseModel,
  ResourceRow,
  AddValidation extends ZodRawShape,
  FilterModel = unknown
> {
  title: string; // Admin
  serviceKey: string; // admin | topupPackage
  getRows: (item: BaseModel) => ResourceRow;
  getColumns: (
    onEdit: (value: any) => void,
    onDelete: (value: any) => void
  ) => DynamicTableCol[];
  getServices: (filter?: FilterModel) => Promise<Response<BaseModel[]>>;
  DeleteProps?: {
    service: (id: string) => Promise<Response<BaseModel>>;
    label: (item: ResourceRow) => string;
    deleteText?: string;
    cancelText?: string;
  };
  // filter?: Omit<
  //   FilterSectionProps<FilterModel>,
  //   "optionFilter" | "setOptionsFilter"
  // >;
  AddProps?: ResourceAddEditProps<AddValidation>;
  EditProps?: ResourceAddEditProps<BaseModel>;
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
      getColumns,
      DeleteProps,
      AddProps,
      EditProps,
      // @ts-expect-error --- temp disabling the filter
      filter,
    } = props;

    type ResourceRow = ReturnType<typeof getRows>;

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedResource, setSelectedResource] = useState<ResourceRow>();
    const [optionFilter, setOptionsFilter] = useState<F>();
    const resourceQuery = useQuery(
      [serviceKey, filter && optionFilter],
      async () => {
        const result = await getServices(optionFilter);
        return result;
      }
    );

    // const notification = useNotification();

    const deleteMutation = useMutation(
      ["delete", serviceKey],
      () => {
        if (!DeleteProps) {
          return Promise.resolve({
            statusCode: 400,
            data: {},
            message: "Something went wrong.",
          });
        }
        return DeleteProps?.service(selectedResource?.id ?? "");
      },
      {
        onSuccess: (res: any) => {
          resourceQuery.refetch();
          setOpenDeleteDialog(false);
          // notification.show(res.message);
        },
        // onError: notification.default.error,
      }
    );

    const handleDeleteSubmit = useCallback(() => {
      deleteMutation.mutate();
    }, []);

    const rows: ResourceRow[] = useMemo(
      () => (resourceQuery.data ? resourceQuery.data?.data.map(getRows) : []),
      [resourceQuery.data]
    );

    useImperativeHandle(
      forwardedRef,
      () => ({
        refetchRead: () => resourceQuery.refetch(),
      }),
      [forwardedRef]
    );

    const handleEdit = (row: DynamicTableParams) => {
      setSelectedResource(row.values as ResourceRow);
      setOpenEditDialog(true);
    };

    const handleDelete = (row: DynamicTableParams) => {
      setSelectedResource(row.values as ResourceRow);
      setOpenDeleteDialog(true);
    };

    return (
      <>
        <Layout
          title={title}
          onClickButton={() => setOpenAddDialog(true)}
          hideButton={!AddProps}
        >
          <div className="flex flex-col gap-6 mt-4">
            {/* {filter && (
              <FilterSection
                optionFilter={optionFilter}
                setOptionsFilter={setOptionsFilter}
                {...filter}
              />
            )} */}
            {!resourceQuery.isFetching ? (
              <DynamicTable
                columns={getColumns(handleEdit, handleDelete)}
                rows={rows}
              />
            ) : (
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            )}
          </div>
        </Layout>
        {AddProps && (
          <AddResourceDialog
            open={openAddDialog}
            onOpenChange={setOpenAddDialog}
            onSuccess={() => resourceQuery.refetch()}
            serviceKey={serviceKey}
            title={title}
            {...AddProps}
          />
        )}
        {selectedResource && (
          <>
            {/* {EditProps && (
              <EditResourceDialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                data={selectedResource}
                onSuccess={() => resourceQuery.refetch()}
                serviceKey={StringHelper.toPascalCase(serviceKey)}
                title={title}
                {...EditProps}
              />
            )} */}
            {DeleteProps && (
              <DeletePromptDialog
                title={DeleteProps.label(selectedResource)}
                open={openDeleteDialog}
                onOpenChange={setOpenDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onSubmit={handleDeleteSubmit}
                cancelText={DeleteProps.cancelText}
                deleteText={DeleteProps.deleteText}
              />
            )}
          </>
        )}
      </>
    );
  }
);

export default Resource as <T, R extends Model, F = unknown>(
  props: ResourceProps<T, R, F>,
  forwardedRef: Ref<ResourceRef<T>>
) => JSX.Element;
