import { Skeleton } from "~/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      {[...new Array(5)].map((_, j) => (
        <div key={j} className="flex gap-4">
          {[...new Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-full h-[24px] rounded-sm" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
