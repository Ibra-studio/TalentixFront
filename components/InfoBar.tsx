"use client"

import * as React from "react"
import { Info } from "lucide-react"

export function InfoBar() {
  return (
    <div className="border border-[#C7E4FC] bg-[#C7E4FC] text-black text-xs rounded-md p-3 flex items-center gap-2.5">
      <div className="p-1 rounded-sm bg-[#C7E4FC] text-black shrink-0 mt-0.5">
        <Info className="h-3.5 w-3.5" />
      </div>
      <p className="leading-normal">
        Votre compte entreprise est rempli avec des données d'exemple. Lorsque vous serez prêt à recruter, vous pourrez{" "}
        <span className="underline underline-offset-2 cursor-pointer text-black font-medium hover:text-black/80">
          supprimer les données d'exemple
        </span>
        .
      </p>
    </div>
  )
}
