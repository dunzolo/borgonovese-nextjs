// #REACT
import { GetServerSideProps, GetServerSidePropsContext } from "next";
// # LAYOUT
import DashboardLayout from "@/components/layouts/AdminLayout";
// #UI COMPONENTS
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GroupClient } from "@/components/tables/group-table/client";
import { ScrollArea } from "@/components/ui/scroll-area";
// # SUPABASE
import {
  getAllCategories,
  getGroupsByTournament,
  getRankingByGroup,
} from "@/api/supabase";
// # MODELS
import { SquadGroup } from "@/models/SquadGroup";
// # UTILS
import { getCustomWidthTabs, getGroupedData } from "@/utils/utils";
import { handleRedirect } from "@/utils/supabase/redirect";

type Props = {
  groups: SquadGroup[][];
  categories: string[];
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const responseRedirect = await handleRedirect(context);
  const slug = context.params?.name?.toString();

  if (responseRedirect.redirect) return responseRedirect;

  try {
    const groupsArray = await getGroupsByTournament(slug as string);
    return {
      props: {
        groups: await getRankingByGroup(groupsArray),
        categories: await getAllCategories(slug as string),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default function page({ groups, categories }: Props) {
  const allData = (groups as SquadGroup[][])
    .flat()
    .reduce<SquadGroup[]>((acc, curr) => acc.concat(curr), []);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Classifiche</h2>
        </div>
        <Tabs defaultValue={categories[0]} className="space-y-4">
          <TabsList className="w-full">
            {categories.map((category, index) => {
              return (
                <TabsTrigger
                  key={index}
                  value={category}
                  className={getCustomWidthTabs(categories.length)}
                >
                  {category}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {categories.map((category, index) => {
            return (
              <TabsContent key={index} value={category} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(getGroupedData(allData, category)).map(
                    ([group, data]) => (
                      <Card key={group}>
                        <CardHeader className="flex flex-row items-center justify-center space-y-0 p-2">
                          <CardTitle className="text-sm font-medium">
                            GIRONE {group}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-2">
                          <GroupClient data={data} />
                        </CardContent>
                        <div className="flex-1 text-sm text-muted-foreground text-center space-x-2 py-2">
                          Classifica aggiornata
                        </div>
                      </Card>
                    )
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </ScrollArea>
  );
}
