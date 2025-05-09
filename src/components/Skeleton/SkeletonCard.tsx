import { Skeleton } from "../ui/skeleton";

export const SkeletonCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
      {Array(8)
        .fill(0)
        .map(() => (
          <div className="flex flex-col gap-4 h-[500px] w-full bg-card rounded-xl shadow-sm">
            <Skeleton className="w-full h-[300px] rounded-t-xl" />
            <div className="px-4 flex flex-col gap-2">
              <Skeleton className="w-3/4 h-[1.5rem]" />
              <Skeleton className="w-1/2 h-[1.0rem]" />
              <Skeleton className="w-full h-[1.0rem]" />
              <Skeleton className="w-full h-[1.0rem]" />
              <div className="flex flex-col gap-2">
                <Skeleton className="w-1/2 h-[0.7rem]" />
                <Skeleton className="w-1/2 h-[rem]" />
              </div>
            </div>
            <div className="flex items-center justify-between w-full gap-4 px-4 mt-auto mb-4">
              <Skeleton className="w-2/4 h-[1.0rem]" />
              <Skeleton className="w-1/4 h-[1.5rem] rounded-full" />
            </div>
          </div>
        ))}
    </div>
  );
};
