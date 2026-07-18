"use client";

import { createContext, useCallback, useContext, useState } from "react";



interface SearchContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
    toggle: () => void;
}
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
   const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);
   return (
      <SearchContext.Provider value={{ open, setOpen, toggle }}>
         {children}
      </SearchContext.Provider>
   );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (context===undefined) {
        throw new Error("useSearch doit être utilisé au sein d'un SearchProvider");
    }
    return context;
}