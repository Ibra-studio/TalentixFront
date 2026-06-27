"use client";

import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Send, Archive } from "lucide-react";
import { Job } from "@/types/Job";

interface JobTableProps {
  jobs: Job[];
}

export function JobTable({ jobs }: JobTableProps) {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const toggleAll = () => {
    if (selectedIds.size === jobs.length && jobs.length > 0) setSelectedIds(new Set());
    else setSelectedIds(new Set(jobs.map((j) => j.id)));
  };

  const isAllSelected = jobs.length > 0 && selectedIds.size === jobs.length;

  return (
    // 1. On simplifie le parent : w-full et overflow-hidden
    <div className="w-full border border-foreground/20 rounded-lg bg-card overflow-hidden flex flex-col">
      
      {/* Barre d'actions */}
      {selectedIds.size > 0 && (
        <div className="bg-brand/10 border-b border-brand/20 p-2 flex items-center justify-between animate-in fade-in slide-in-from-top-1 duration-200">
          <span className="text-xs font-medium text-brand px-2">{selectedIds.size} job(s) sélectionné(s)</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-xs text-destructive hover:bg-destructive/10"><Trash2 className="w-3.5 h-3.5 mr-2" /> Supprimer</Button>
            <Button variant="ghost" size="sm" className="text-xs"><Archive className="w-3.5 h-3.5 mr-2" /> Archiver</Button>
            <Button variant="default" size="sm" className="text-xs bg-brand text-black hover:bg-brand/90"><Send className="w-3.5 h-3.5 mr-2" /> Diffuser</Button>
          </div>
        </div>
      )}

      {/* 2. LE SECRET EST ICI : "grid" empêche l'élément de déborder de son parent */}
      <div className="grid w-full overflow-x-auto custom-scrollbar">
        {/* 3. On garde whitespace-nowrap pour forcer le texte sur une ligne */}
        <Table className="w-full whitespace-nowrap">
          <TableHeader className="bg-muted/40 select-none">
            <TableRow className="border-b border-foreground/20 hover:bg-transparent">
              <TableHead className="w-[40px] px-3">
                <Checkbox 
                  checked={isAllSelected} 
                  onCheckedChange={toggleAll}
                  className="data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                />
              </TableHead>
              <TableHead className="text-xs font-medium tracking-wide">Job Title</TableHead>
              <TableHead className="text-xs font-medium tracking-wide">Department</TableHead>
              <TableHead className="text-xs font-medium tracking-wide">Status</TableHead>
              <TableHead className="text-xs font-medium tracking-wide text-right">Candidates</TableHead>
              <TableHead className="text-xs font-medium tracking-wide text-right">Suivi</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">Aucune offre trouvée.</TableCell>
                </TableRow>
            ) : (
                jobs.map((job) => {
                  const isSelected = selectedIds.has(job.id);
                  return (
                    <TableRow 
                      key={job.id} 
                      className={`border-b border-foreground/20 transition-colors group ${
                        isSelected
                        ? "bg-brand hover:bg-brand/10 dark:bg-brand/20 dark:hover:bg-brand/30"
                        : "hover:bg-brand/30"
                      }`}
                    >
                      <TableCell className="px-3">
                        <Checkbox 
                          checked={isSelected} 
                          onCheckedChange={() => toggleSelection(job.id)}
                          className="border-muted-foreground/40 data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                        />
                      </TableCell>
                      <TableCell className="font-medium text-sm text-foreground/90">{job.title}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{job.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[11px] px-2 font-normal rounded">{job.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right text-xs font-medium">{job.candidatesCount}</TableCell>
                      <TableCell className="text-right text-xs font-medium">{job.isFollow ? "Oui" : "Non"}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )
                })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}