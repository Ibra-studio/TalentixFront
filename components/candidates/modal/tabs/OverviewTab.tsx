"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Candidate } from "@/types/candidate";
import { Copy, Edit2, Mail, Download, ExternalLink, MoreHorizontal, Plus } from "lucide-react";

interface OverviewTabProps {
  candidate: Candidate;
}

export function OverviewTab({ candidate }: OverviewTabProps) {
  return (
    <Accordion
      type="multiple"
      // Ces valeurs correspondent aux attributs `value` des AccordionItem, 
      // ils seront ouverts par défaut.
      defaultValue={["contact", "details", "profile-fields", "cover-letter", "cv"]}
      className="w-full space-y-4"
    >
      {/* 1. SECTION CONTACT */}
      <AccordionItem value="contact" className="rounded-lg border border-border bg-card px-4 ">
        <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold hover:cursor-pointer">
          <div className="flex w-full items-center justify-between gap-4">
            <span>Contact</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 gap-2 text-muted-foreground hover:text-foreground"
              onClick={(event) => event.stopPropagation()}
            >
              <Mail className="size-4" />
              Send message
            </Button>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pb-4">
          <div className="grid grid-cols-[100px_1fr] items-center gap-y-4 text-sm">
            <span className="text-muted-foreground">Email</span>
            <div className="flex items-center gap-2">
              <span>{candidate.email}</span>
              <Button variant="ghost" size="icon" className="size-6"><Copy className="size-3" /></Button>
            </div>
            
            <span className="text-muted-foreground">Phone</span>
            <div className="flex items-center gap-2">
              <span>{candidate.phone}</span>
              <Button variant="ghost" size="icon" className="size-6"><Copy className="size-3" /></Button>
            </div>
            
            <span className="text-muted-foreground">Socials</span>
            <span>—</span>
            
            <span className="text-muted-foreground">Links</span>
            <div className="flex items-center gap-2">
              <span>—</span>
              <Button variant="ghost" size="icon" className="size-6"><Edit2 className="size-3" /></Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 2. SECTION DETAILS */}
      <AccordionItem value="details" className="rounded-lg border-border border bg-card px-4 ">
        <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold hover:cursor-pointer">
          <div className="flex w-full items-center justify-between gap-4">
            <span>Details</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pb-4">
          <div className="grid grid-cols-[100px_1fr] items-center gap-y-4 text-sm">
             <span className="text-muted-foreground">Date created</span>
             <span>28 Apr 2026 (15 days ago) • Sourced from LinkedIn by John the Assistant</span>
             
             <span className="text-muted-foreground">Source</span>
             <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  LinkedIn <span className="ml-2 cursor-pointer opacity-70 hover:opacity-100">×</span>
                </span>
                <Button variant="outline" size="icon" className="size-6 rounded-full">
                  <Plus className="size-3" />
                </Button>
             </div>
             
             <span className="text-muted-foreground">Last activity</span>
             <span>15 days ago</span>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 3. SECTION PROFILE FIELDS */}
      <AccordionItem value="profile-fields" className="rounded-lg border  border-border bg-card px-4 ">
        <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold hover:cursor-pointer">
          <div className="flex w-full items-center justify-between gap-4">
            <span>Profile fields</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-muted-foreground hover:text-foreground"
              onClick={(event) => event.stopPropagation()}
            >
              <Plus className="size-4" />
              Add profile field
            </Button>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4">
          {/* Contenu vide pour l'instant comme sur la capture */}
        </AccordionContent>
      </AccordionItem>

      {/* 4. SECTION COVER LETTER */}
      <AccordionItem value="cover-letter" className="rounded-lg border border-border bg-card px-4 ">
        <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold hover:cursor-pointer">
          <div className="flex w-full items-center justify-between gap-4">
            <span>Cover letter</span>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="icon" className="size-7" onClick={(event) => event.stopPropagation()}><Edit2 className="size-3.5" /></Button>
              <Button type="button" variant="outline" size="icon" className="size-7" onClick={(event) => event.stopPropagation()}><MoreHorizontal className="size-3.5" /></Button>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-foreground pb-4 whitespace-pre-wrap">
          As a Marketer with 6 years of experience, I believe that I am the ideal candidate for this position. I am a goal-oriented, hard-working team-player.{"\n\n"}
          I look forward to hearing from you. I can be reached at scot.example@recruiteemail.com or +12312312312.{"\n\n"}
          Sincerely,{"\n"}
          Scot Highlander
        </AccordionContent>
      </AccordionItem>

      {/* 5. SECTION CV (Avec le Toggle) */}
      <AccordionItem value="cv" className="rounded-lg border border-border bg-card px-4 hover:cursor-pointer">
        <AccordionTrigger className="hover:no-underline py-2 text-base font-semibold [&>svg]:hidden hover:cursor-pointer">
          <div className="mb-4 flex w-full items-center justify-between gap-6 border-b border-border/50 pb-3">
            <div className="flex items-center gap-6">
              <span>CV</span>
              {/* Le toggle File / Experience simulé */}
              <div className="flex items-center rounded-md border border-border bg-muted/30 p-0.5">
                <button type="button" className="rounded bg-background px-3 py-1 text-xs font-semibold shadow-sm" onClick={(event) => event.stopPropagation()}>File</button>
                <button type="button" className="rounded px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground" onClick={(event) => event.stopPropagation()}>Experience</button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="icon" className="size-7" onClick={(event) => event.stopPropagation()}><Download className="size-3.5" /></Button>
              <Button type="button" variant="outline" size="icon" className="size-7" onClick={(event) => event.stopPropagation()}><ExternalLink className="size-3.5" /></Button>
              <Button type="button" variant="outline" size="icon" className="size-7" onClick={(event) => event.stopPropagation()}><MoreHorizontal className="size-3.5" /></Button>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4">
            {candidate.cvUrl ? (
              <iframe
                src={candidate.cvUrl}
                className="h-[600px] w-full rounded-md border"
                title={`CV de ${candidate.name}`}
              />
            ) : (
              <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed bg-muted/20">
                <p className="text-sm text-muted-foreground">Aucun CV joint</p>
              </div>
            )}    
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}