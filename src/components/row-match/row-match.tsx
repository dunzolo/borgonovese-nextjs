import { MatchDatum } from "@/models/Match";
import { timeFormatHoursMinutes } from "@/utils/utils";

interface MatchClientProps {
  matchProps: MatchDatum;
}

export default function RowMatch({ matchProps }: MatchClientProps) {
  const { squad_home, squad_away, hour, field, outcome } = matchProps;

  return (
    <div>
      {/* <div className="flex flex-row items-center justify-around space-y-0 pb-2">
        <p className="text-sm font-medium">📆 {day}</p>
        <p className="text-xs text-muted-foreground pt-1">{field}</p>
      </div> */}
      {/* <Card className="rounded-full mb-2"> */}
      <div className="px-4 py-2 flex items-center justify-between text-sm font-bold">
        <div className="w-1/3">{squad_home.name}</div>
        <div className="rounded min-w-[55px] bg-gray-400 bg-opacity-50 text-center px-2 py-1">
          {outcome ? outcome : timeFormatHoursMinutes(hour)}
        </div>
        <div className="w-1/3 text-end">{squad_away.name}</div>
      </div>
      {/* </Card> */}
    </div>
  );
}
