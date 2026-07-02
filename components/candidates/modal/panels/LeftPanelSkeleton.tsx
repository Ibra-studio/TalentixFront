import { Spinner } from "@/components/ui/spinner";

export function LeftPanelSkeleton() {
  return (
    <div className="flex flex-col h-full p-8 w-full gap-8">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4">
        <div className="size-16 rounded-full bg-muted animate-pulse" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-7 w-1/3 bg-muted animate-pulse rounded-md" />
          <div className="h-4 w-1/4 bg-muted animate-pulse rounded-md" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-24 bg-muted animate-pulse rounded-md" />
          <div className="h-9 w-24 bg-muted animate-pulse rounded-md" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-8 border-b border-border pb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-4 w-20 bg-muted animate-pulse rounded-sm" />
        ))}
      </div>

      {/* Main Spinner area */}
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
        <Spinner className="size-10 text-[var(--color-brand)]" />
        <span className="text-sm font-medium tracking-wide">Récupération du profil candidat...</span>
      </div>
    </div>
  );
}

export function TabContentSkeleton() {
  return (
    <div className="flex flex-col gap-6 py-4 animate-in fade-in duration-300">
      <div className="h-8 w-1/3 bg-muted animate-pulse rounded-md" />
      <div className="space-y-3">
        <div className="h-24 w-full bg-muted/50 animate-pulse rounded-lg" />
        <div className="h-24 w-full bg-muted/50 animate-pulse rounded-lg" />
        <div className="h-24 w-full bg-muted/50 animate-pulse rounded-lg" />
      </div>
    </div>
  );
}