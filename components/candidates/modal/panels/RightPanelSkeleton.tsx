import { Skeleton } from "@/components/ui/skeleton";

export function RightPanelSkeleton() {
  return (
    <div className="flex flex-col h-full bg-muted/10 p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      {/* Main Card (Status) */}
      <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-8 w-32 rounded-md" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-16 w-16 rounded-full" />
        </div>
        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-10 w-full mt-2 rounded-md" />
      </div>

      {/* Tasks Card */}
      <div className="rounded-xl border border-border bg-card p-4">
        <Skeleton className="h-5 w-20 mb-4" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Notes Card */}
      <div className="rounded-xl border border-border bg-card p-4 flex-1">
        <Skeleton className="h-5 w-20 mb-4" />
        <Skeleton className="h-10 w-full rounded-md mb-6" />
        <div className="flex gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-2 flex-1">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}