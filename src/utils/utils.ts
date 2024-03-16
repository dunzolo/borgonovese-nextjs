import { updatePointsGroup } from "@/api/supabase";
import { Match, MatchDatum } from "@/models/Match";
import { SquadGroup } from "@/models/SquadGroup";

/**
 * Funzione che converte la data in formato italiano
 * @param date Data che vuoi convertire
 * @returns
 */
export const dateFormatItalian = (date: string) => {
  const data = new Date(date);

  const dataFormattata = data.toLocaleDateString("it-IT");

  // Trasformare la prima lettera del giorno in maiuscolo
  const dataFormattataCapitalized =
    dataFormattata.charAt(0).toUpperCase() + dataFormattata.slice(1);

  return dataFormattataCapitalized;
};

/**
 * Funzione che rimuove i secondi dall'orario in formato stringa
 * @param time
 * @returns
 */
export const timeFormatHoursMinutes = (time: string) => {
  const [hours, minutes] = time.split(":");
  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
};

/**
 * Funzione che aggiorna i punteggi del girone in base ai goal realizzati
 * @param matchesBySquad array di tutte le partite del torneo della squadra
 * @param squad squadra per cui devo aggiornare i dati della classfica
 * @param group girone della squadra
 * @param isHomeSquad valore per indicare se è squadra casalinga
 */
export const updatePoints = async (
  matchesBySquad: Match,
  squad: SquadGroup,
  group: string,
  isHomeSquad: boolean
) => {
  //azzero ogni volta il punteggio per gestire le modifiche dei punteggi delle partite
  squad.goal_scored = 0;
  squad.goal_conceded = 0;
  squad.goal_difference = 0;
  squad.points = 0;

  matchesBySquad.map((match: MatchDatum) => {
    //assegno i punteggi quando la partita cointiene un risultato
    if (match.score_home != null && match.score_away != null) {
      //verifico tramite booleano se la squadra ha giocato in casa oppure no per aggiornare la relativa classifica
      squad.goal_scored += isHomeSquad ? match.score_home : match.score_away;
      squad.goal_conceded += isHomeSquad ? match.score_away : match.score_home;
      squad.goal_difference += squad.goal_scored - squad.goal_conceded;

      if (squad.goal_scored > squad.goal_conceded) {
        squad.points += 3;
      } else if (squad.goal_scored == squad.goal_conceded) {
        squad.points += 1;
      } else {
        squad.points += 0;
      }
    }
  });

  const response = await updatePointsGroup(
    group,
    squad.id,
    squad.points,
    squad.goal_scored,
    squad.goal_conceded,
    squad.goal_difference
  );
};

export const getGroupedData = (data: SquadGroup[], category: string) => {
  // Filtra gli oggetti in base al campo "category"
  const groupedDataEsordienti = data.reduce<{ [key: string]: SquadGroup[] }>(
    (acc, curr) => {
      if (curr.squad_id.category === category) {
        const group = curr.squad_id.group;
        // Verifica se acc[group] è già definito, altrimenti inizializza come array vuoto
        if (!acc[group]) {
          acc[group] = [];
        }
        acc[group].push(curr);
      }
      return acc;
    },
    {}
  );

  return groupedDataEsordienti;
};
