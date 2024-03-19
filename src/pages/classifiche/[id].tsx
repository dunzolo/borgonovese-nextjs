// #REACT
import { GetServerSideProps, GetServerSidePropsContext } from "next";
// # LAYOUT
import RootLayout from "@/components/layouts/RootLayout";
// #UI COMPONENTS
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GroupClient } from "@/components/tables/group-table/client";
import { ScrollArea } from "@/components/ui/scroll-area";
// # SUPABASE
import { getGroupsByCategory, getRankingByGroup } from "@/api/supabase";
// # MODELS
import { SquadGroup } from "@/models/SquadGroup";
import { getMatchesByCategory } from "../../api/supabase";
import { Match, MatchDatum } from "@/models/Match";
import RowMatch from "@/components/row-match/row-match";

type Props = {
  groups: SquadGroup[][];
  matches: MatchDatum[];
  categoryProps: string;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const category = context.params?.id?.toString();

  try {
    const groupsCategory = await getGroupsByCategory(category);
    return {
      props: {
        categoryProps: category,
        groups: await getRankingByGroup(groupsCategory),
        matches: await getMatchesByCategory(category),
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

page.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};

export default function page({ groups, matches, categoryProps }: Props) {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Classifica {categoryProps}
          </h2>
        </div>
        <Tabs defaultValue="classifica" className="space-y-4">
          <TabsList>
            <TabsTrigger value="classifica">Classifica</TabsTrigger>
            <TabsTrigger value="partite">Partite</TabsTrigger>
          </TabsList>
          <TabsContent value="classifica" className="space-y-4">
            {Object.entries(groups).map(([group, data]) => (
              <Card key={group}>
                <CardHeader className="flex flex-row items-center justify-center space-y-0 p-2">
                  <CardTitle className="text-sm font-medium">
                    GIRONE {data[0].squad_id.group}
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
          <TabsContent value="partite" className="space-y-4">
            {matches.map((match) => (
              <RowMatch key={match.id} matchProps={match} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
