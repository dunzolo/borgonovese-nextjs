import { Tournament } from "./Tournament";

export interface Category {
    id: string;
    created_at: string;
    name: string;
    description: string;
    tournament_id: Tournament;
    show_final_phase: boolean;
  }
  