// types/pipeline.ts
import { Candidate } from "@/types/candidate";

export interface PipelineStage {
  id: string;
  title: string;
  candidates: Candidate[];
}