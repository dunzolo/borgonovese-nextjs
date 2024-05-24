import { Tournament } from "./Tournament";
export interface Squad {
  id: string;
  logo: string;
  name: string;
  group: string;
  group_finals: string;
  category: string;
  show_label_group: boolean;
  tournament_id: Tournament;
  created_at: string;
}
