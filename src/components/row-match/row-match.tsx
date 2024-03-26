import { MatchDatum } from "@/models/Match";
import { dateFormatItalian, timeFormatHoursMinutes } from "@/utils/utils";
import { Card, CardHeader, CardTitle } from "../ui/card";

interface MatchClientProps {
  matchProps: MatchDatum;
  showBgColor?: boolean;
}

export default function RowMatch({
  matchProps,
  showBgColor = true,
}: MatchClientProps) {
  const { squad_home, squad_away, hour, field, outcome, day } = matchProps;
  let bg_color;

  if (showBgColor) {
    switch (squad_home.category.toLowerCase()) {
      case "esordienti":
        bg_color = "bg-green-500";
        break;
      case "2013":
        bg_color = "bg-red-500";
        break;
      case "2014":
        bg_color = "bg-yellow-500";
        break;
      case "2015":
        bg_color = "bg-orange-500";
        break;
      case "2016":
        bg_color = "bg_pink_500";
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Card className={`rounded-xl mb-2 relative ${bg_color ?? ""}`}>
        {!showBgColor ? (
          <>
            <CardHeader className="rounded-t-xl bg-muted px-4 py-2">
              <CardTitle className="text-sm font-medium flex justify-between">
                <span>📆 {dateFormatItalian(day)}</span>
                <span>GIRONE {squad_home.group}</span>
              </CardTitle>
            </CardHeader>
          </>
        ) : null}
        <div className="px-4 py-2 flex items-center justify-between text-sm font-bold">
          <div className="w-1/3">{squad_home.name}</div>
          <div className="rounded min-w-[55px] bg-white bg-opacity-50 text-center px-2 py-1">
            {outcome ? outcome : timeFormatHoursMinutes(hour)}
          </div>
          <div className="w-1/3 text-end">{squad_away.name}</div>
        </div>
        {/* <div className="absolute top-0 left-0 w-full">
          <div className="px-4 py-2 flex items-center justify-between text-sm font-bold">
            <div className="w-1/3 bg-red-700">ù</div>
            <div className="rounded min-w-[55px] bg-gray-400 bg-opacity-50 text-center px-2 py-1">
              {outcome ? outcome : timeFormatHoursMinutes(hour)}
            </div>
            <div className="w-1/3 text-end bg-green-700">ù</div>
          </div>
        </div> */}
      </Card>
    </>
  );
}
