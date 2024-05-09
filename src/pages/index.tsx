import {
  getAllCategories,
  getAllCurrentYearTournaments,
  getAllSquads,
} from "@/api/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tournament } from "@/models/Tournament";
import { dateFormatItalian } from "@/utils/utils";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { generateSlug } from "../utils/utils";
import Image from "next/image";

type Props = {
  currentTournaments: Tournament[];
};

const options = {
  month: "long",
  day: "numeric",
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    return {
      props: {
        currentTournaments: await getAllCurrentYearTournaments(
          new Date().getFullYear()
        ),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  const [categories, setCategoryCount] = useState<string[]>([]);
  const [squads, setSquadCount] = useState<Tournament[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countCategories = await getAllCategories(tournament.slug);
        const countSquads = await getAllSquads(tournament.slug);
        setCategoryCount(countCategories);
        setSquadCount(countSquads);
      } catch (error) {
        console.error("Error fetching category count:", error);
      }
    };

    fetchData();
  }, [tournament.slug]);

  return (
    <Link href={generateSlug(tournament.name)}>
      <Card className="mb-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">{tournament.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between">
          <div className="text-sm font-medium">
            <div>
              🗓 Dal {dateFormatItalian(tournament.date_start, options)} al{" "}
              {dateFormatItalian(tournament.date_end, options)}
            </div>
            <div>
              🏆 {categories.length} categorie - {squads.length} squadre
            </div>
          </div>
          <Image
            src={tournament.logo}
            alt="logo"
            width={512}
            height={512}
            className="w-16 h-16"
          />
        </CardContent>
      </Card>
    </Link>
  );
};

export default function Home({ currentTournaments }: Props) {
  return (
    <div className="container flex-1 space-y-4 p-4 md:p-8">
      <h1 className="text-center text-4xl font-bold">Tornei</h1>
      <Accordion type="single" defaultValue="item-1" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{new Date().getFullYear()}</AccordionTrigger>
          <AccordionContent className="pb-0">
            {currentTournaments?.map((tournament) => {
              return (
                <TournamentCard key={tournament.id} tournament={tournament} />
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="container fixed bottom-0 left-0 sm:left-auto p-4 grid grid-cols-8 lg:grid-cols-12 items-center justify-center gap-2">
        <Image
          src="/logos/baldo_bar.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/cer_col.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/edil3.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/edilizia_92.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/fossati.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/g114.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/g956.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/g2822.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/g3714.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/g3870.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/gbs.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 1.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 2.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 3.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 4.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 6.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 7.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 8.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 9.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 10.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 11.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 12.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 13.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 14.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 15.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 16.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 17.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/Group 18.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/gymed.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/il_gotico.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/IME.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/la_palta.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/molinelli.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/MZ_sicurezza.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/nonna_clara.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/play_piacenza.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/poplast.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/taberna_movida.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/we_the_fun.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
        <Image
          src="/logos/wood_philosophy.png"
          alt="logo"
          width={512}
          height={512}
          className="w-full sm:w-1/2"
        />
      </div>
    </div>
  );
}
