import { GetServerSideProps, GetServerSidePropsContext } from "next";
import DashboardLayout from "@/components/layouts/AdminLayout";
import {
  createGroup,
  getAllSquads,
  getRankingByGroup,
  updateSquadWithGroupFinal,
} from "../../../../api/supabase";
import { Squad } from "@/models/Squad";
import { handleRedirect } from "@/utils/supabase/redirect";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { Heading } from "@/components/ui/heading";
import { SquadGroup } from "@/models/SquadGroup";
import NewMatchForm from "./getNewMatchForm";

type Props = {
  squads: Squad[];
  slug: string;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const responseRedirect = await handleRedirect(context);
  const slug = context.params?.name?.toString();

  if (responseRedirect.redirect) return responseRedirect;

  try {
    return {
      props: {
        squads: await getAllSquads(slug as string),
        slug,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default function Page({ slug }: Props) {
  const [selectedForm, setSelectedForm] = useState("form1"); // Stato per tenere traccia del form selezionato

  const handleFormSwitch = (formName: string) => {
    setSelectedForm(formName); // Funzione per aggiornare lo stato al click del bottone
  };

  const updateSquad = async (team_id: number, group_final_name: string) => {
    try {
      await updateSquadWithGroupFinal(team_id, group_final_name);
    } catch (error: any) {
      console.log(error);
    }
  };

  const generateGroup = async (groups: SquadGroup[][], name: string) => {
    //recupero la prima e la seconda classificata del primo girone
    const first_team = parseInt(groups[0][0].squad_id.id);
    const second_team = parseInt(groups[0][1].squad_id.id);

    //recupero la prima e la seconda classificata del primo girone
    const third_team = parseInt(groups[1][0].squad_id.id);
    const fourth_team = parseInt(groups[1][1].squad_id.id);

    try {
      await updateSquad(first_team, name);
      await updateSquad(second_team, name);
      await updateSquad(third_team, name);
      await updateSquad(fourth_team, name);

      await createGroup(name, first_team);
      await createGroup(name, second_team);
      await createGroup(name, third_team);
      await createGroup(name, fourth_team);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSubmitGroup2014 = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const groups = await getRankingByGroup(["G", "H"]);
    await generateGroup(groups, "group_final_2014");
  };

  const handleSubmitGroup2013 = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const groups = await getRankingByGroup(["E", "F"]);
    await generateGroup(groups, "group_final_2013");
  };

  return (
    <div className="container">
      <div className="grid md:grid-cols-2">
        <div className="text-center mb-3">
          <Heading
            title={`Girone finale 2014`}
            description="crea il girone finale per i 2014"
          />
          <form onSubmit={handleSubmitGroup2014}>
            <Button type="submit" className="mt-1">
              GENERA
            </Button>
          </form>
        </div>
        <div className="text-center mb-3">
          <Heading
            title={`Girone finale 2013`}
            description="crea il girone finale per i 2013"
          />
          <form onSubmit={handleSubmitGroup2013}>
            <Button type="submit" className="mt-1">
              GENERA
            </Button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => handleFormSwitch("form1")}>Girone 2013</Button>
        <Button onClick={() => handleFormSwitch("form2")}>Girone 2014</Button>
      </div>

      {/* Mostra il form selezionato */}
      {selectedForm === "form1" && (
        <NewMatchForm slug={slug} group={"final_2013"} />
      )}

      {/* Mostra il form selezionato */}
      {selectedForm === "form2" && (
        <NewMatchForm slug={slug} group={"final_2014"} />
      )}
    </div>
  );
}
