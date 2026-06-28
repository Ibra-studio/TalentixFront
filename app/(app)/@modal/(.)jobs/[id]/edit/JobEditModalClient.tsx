"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobEditModalClientProps {
  children: React.ReactNode; // On remplace jobId et initialJob par children
}

export default function JobEditModalClient({ children }: JobEditModalClientProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4 md:p-8"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-[1300px] h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute -top-2 -right-2 md:-top-1 md:-right-12 h-9 w-9 rounded-full bg-brand hover:bg-brand hover:text-sidebar-accent-foreground text-sidebar-accent-foreground z-10"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="w-full h-full bg-background border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden relative">
            {/* C'est ici que le contenu (ou le loading) va s'afficher */}
            {children} 
          </div>
        </div>
      </div>
    </div>
  );
}