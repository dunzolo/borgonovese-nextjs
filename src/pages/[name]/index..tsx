import {
  getAllCategories,
  getAllMatch,
  getAllMatchGroupByDay,
  getTournament,
} from "@/api/supabase";
import RootLayout from "@/components/layouts/RootLayout";
import RowMatch from "@/components/row-match/row-match";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Match, MatchDatum } from "@/models/Match";
import { Tournament } from "@/models/Tournament";
import { dateFormatItalian } from "@/utils/utils";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState } from "react";

type Props = {
  matches: { [key: string]: MatchDatum[] };
  categories: string[];
  tournament: Tournament[];
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

  try {
    return {
      props: {
        matches: await getAllMatchGroupByDay(slug as string),
        categories: await getAllCategories(slug as string),
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

export default function Home({ categories, matches, tournament }: Props) {
  const [filterSquad, setFilterSquad] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const handleFilterChangeSquad = (event: any) => {
    const value = event.target.value;
    setFilterSquad(value);
  };

  const handleFilterChangeCategory = (event: any) => {
    if (event === "all") {
      event = "";
    }

    setFilterCategory(event);
  };

  //Filtra i dati in base al campo "name" e "category"
  const filterData = Object.entries(matches).map(([date, matchesForDate]) =>
    matchesForDate.filter(
      (match) =>
        (match.squad_home.name
          .toLowerCase()
          .includes(filterSquad.toLowerCase()) ||
          match.squad_away.name
            .toLowerCase()
            .includes(filterSquad.toLowerCase())) &&
        match.squad_home.category
          .toLowerCase()
          .includes(filterCategory.toLowerCase())
    )
  );

  return (
    <div className="container flex-1 space-y-4 p-4 md:p-8">
      <h1 className="text-center text-2xl font-bold">
        {tournament.at(0)?.name}
      </h1>
      <h3 className="text-center !mt-0">{tournament.at(0)?.description}</h3>

      <div className="grid grid-cols-2 w-full items-center gap-1.5">
        <div className="text-center">
          <Label>Nome squadra</Label>
          <Input
            type="text"
            placeholder="Nome della squadra"
            value={filterSquad}
            onChange={handleFilterChangeSquad}
          />
        </div>
        <div className="text-center">
          <Label>Categoria</Label>
          <Select onValueChange={handleFilterChangeCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Seleziona la categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tutte</SelectItem>
                {categories.map((category) => {
                  return (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filterData.map((matchesForDate, index) => (
        <div key={index}>
          {matchesForDate[0]?.day ? (
            <>
              <h2 className="text-center text-sm font-bold mb-2">
                {dateFormatItalian(matchesForDate[0]?.day, options)}
              </h2>
              <Separator className="h-[2px] mb-2" />
            </>
          ) : null}
          <div className="grid gap-2 md:grid-cols-2">
            {matchesForDate.map((match) => (
              <RowMatch key={match.id} matchProps={match} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
