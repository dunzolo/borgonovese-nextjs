import {
  getAllDistinctSquads,
  getAllMatchGroupByDay,
  getGroupsByCategory,
  getRankingByGroup,
  getSingleCategory,
  getTournament,
} from "@/api/supabase";
import RootLayout from "@/components/layouts/RootLayout";
import RowMatch from "@/components/row-match/row-match";
import { GroupClient } from "@/components/tables/group-table/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/models/Category";
import { MatchDatum } from "@/models/Match";
import { SquadGroup } from "@/models/SquadGroup";
import { Tournament } from "@/models/Tournament";
import { dateFormatItalian, getBackgroundColorCard } from "@/utils/utils";
import clsx from "clsx";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState } from "react";

type Props = {
  tournament: Tournament[];
  category: Category;
  squads: string[];
  matches: { [key: string]: MatchDatum[] };
  groups: SquadGroup[][];
};

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context.params?.name?.toString();
  const category = context.params?.category?.toString();

  try {
    const groupsCategory = await getGroupsByCategory(category);

    return {
      props: {
        matches: await getAllMatchGroupByDay(
          slug as string,
          category as string
        ),
        category: await getSingleCategory(category as string),
        groups: await getRankingByGroup(groupsCategory),
        squads: await getAllDistinctSquads(slug as string, category as string),
        tournament: await getTournament(slug as string),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

Home.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};

export default function Home({
  category,
  matches,
  tournament,
  squads,
  groups,
}: Props) {
  const [filterSquad, setFilterSquad] = useState("");

  const handleFilterChangeSquad = (event: any) => {
    if (event === "all") {
      event = "";
    }
    setFilterSquad(event);
  };

  //Filtra i dati in base al campo "name" e "category"
  const filterData = Object.entries(matches).map(([date, matchesForDate]) =>
    matchesForDate.filter(
      (match) =>
        match.squad_home.name
          .toLowerCase()
          .includes(filterSquad.toLowerCase()) ||
        match.squad_away.name.toLowerCase().includes(filterSquad.toLowerCase())
    )
  );

  return (
    <div className="container flex-1 space-y-4 p-4 md:p-8">
      <h1 className="text-center text-2xl font-bold">
        {tournament.at(0)?.name}
      </h1>
      <h3 className="text-center !mt-0">
        Categoria {category.name.toLowerCase()}
      </h3>

      <Tabs defaultValue="partite">
        <div className="bg-white sticky top-[56px] py-2 z-[3]">
          <TabsList className="w-full">
            <TabsTrigger className="w-1/2" value="partite">
              Partite
            </TabsTrigger>
            <TabsTrigger className="w-1/2" value="gironi">
              Gironi
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="partite" className="!mt-0 space-y-4">
          <div className="grid grid-cols-1 w-full items-center gap-1.5 sticky top-[100px] bg-white z-[3] py-2">
            <div className="text-center">
              <Label>Nome squadra</Label>
              <Select onValueChange={handleFilterChangeSquad}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona la squadra" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tutte</SelectItem>
                    {squads.map((squad) => {
                      return (
                        <SelectItem key={squad} value={squad}>
                          {squad}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filterData.map((matchesForDate, index) => (
            <div key={index} className="!mt-0">
              {matchesForDate[0]?.day ? (
                <div className="sticky !top-[175px] bg-white z-[2] py-2">
                  <h2 className="text-center text-sm font-bold mb-2">
                    {dateFormatItalian(matchesForDate[0]?.day, options)}
                  </h2>
                  <Separator className="h-[2px] mb-2" />
                </div>
              ) : null}
              <div className="grid gap-2 md:grid-cols-2 place-items-center">
                {matchesForDate.map((match) => (
                  <RowMatch key={match.id} matchProps={match} />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="gironi" className="space-y-4">
          {Object.entries(groups).map(([group, data]) => (
            <Card key={group}>
              <CardHeader
                className={clsx(
                  "flex flex-row items-center justify-center space-y-0 p-2 rounded-t-xl opacity-90 text-white",
                  getBackgroundColorCard(data[0].squad_id.category)
                )}
              >
                <CardTitle className="text-sm font-medium">
                  {data[0].squad_id.show_label_group
                    ? "GIRONE " + data[0].squad_id.group
                    : "GIRONE"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <GroupClient data={data} />
              </CardContent>
              <div className="flex-1 text-sm text-muted-foreground text-center space-x-2 py-2">
                Classifica aggiornata
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
