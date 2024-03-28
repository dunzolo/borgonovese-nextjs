import { MatchDatum } from "@/models/Match";
import {
  dateFormatItalian,
  getBackgroundColorCard,
  timeFormatHoursMinutes,
} from "@/utils/utils";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { clsx } from "clsx";

interface MatchClientProps {
  matchProps: MatchDatum;
  showBgColor?: boolean;
  showCardHeader?: boolean;
}

export default function RowMatch({
  matchProps,
  showBgColor = true,
  showCardHeader = false,
}: MatchClientProps) {
  const { squad_home, squad_away, hour, field, outcome, day } = matchProps;
  let bg_color = "";
  let style_header = showCardHeader ? "" : "flex items-center";

  if (showBgColor) {
    bg_color = getBackgroundColorCard(squad_home.category);
  }

  return (
    <>
      <Card
        className={clsx(
          "rounded-xl  mb-2 relative bg-opacity-90",
          style_header,
          bg_color
        )}
      >
        {showCardHeader ? (
          <>
            <CardHeader className="rounded-t-xl bg-muted px-4 py-2">
              <CardTitle className="text-sm font-medium flex justify-between">
                <span>📆 {dateFormatItalian(day)}</span>
                <span>GIRONE {squad_home.group}</span>
              </CardTitle>
            </CardHeader>
          </>
        ) : null}
        <div className="px-4 py-2 min-h-14 w-full flex items-center justify-between text-sm font-bold">
          <div className="w-1/3">{squad_home.name}</div>
          <div className="rounded min-w-[55px] bg-white bg-opacity-50 text-center px-2 py-1">
            <span className="text-xs">
              {outcome ? outcome : timeFormatHoursMinutes(hour)}
              {/* {outcome ? outcome : "Niviano d.c.r."} */}
            </span>
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
