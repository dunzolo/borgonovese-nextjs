import React, { useState } from "react";
import {
  createMatchFinalPhase,
  getAllCategories,
  getAllMatchFinalPhase,
  getSquadsByCategory,
  getTournament,
} from "@/api/supabase";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { MatchDatum } from "@/models/Match";
import { Squad } from "@/models/Squad";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/layouts/AdminLayout";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Props = {
  categories: string[];
  slug: string;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context.params?.name?.toString();
  try {
    const categories = await getAllCategories(slug as string);
    return {
      props: {
        categories,
        slug,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

Create.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default function Create({ categories, slug }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTeamHome, setSelectedTeamHome] = useState("");
  const [subcategories, setSubcategories] = useState<Squad[]>([]);
  const [selectedSquadHome, setSelectedSquadHome] = useState("");
  const [selectedSquadAway, setSelectedSquadAway] = useState("");

  const [form, setForm] = useState<MatchDatum>({
    id: "",
    created_at: "",
    day: "",
    hour: "",
    squad_home: {
      id: "",
      name: "",
      logo: "",
      group: "",
      group_finals: "",
      category: "",
      created_at: "",
      show_label_group: true,
      tournament_id: {
        id: "",
        name: "",
        year: 0,
        logo: "",
        description: "",
        date_start: "",
        date_end: "",
        background_image: "",
        created_at: "",
        slug: "",
      },
    },
    squad_away: {
      id: "",
      name: "",
      logo: "",
      group: "",
      group_finals: "",
      category: "",
      created_at: "",
      show_label_group: true,
      tournament_id: {
        id: "",
        name: "",
        year: 0,
        logo: "",
        description: "",
        date_start: "",
        date_end: "",
        background_image: "",
        created_at: "",
        slug: "",
      },
    },
    outcome: "",
    score_home: 0,
    score_away: 0,
    field: "",
    tournament_id: {
      id: "",
      name: "",
      year: 0,
      logo: "",
      description: "",
      date_start: "",
      date_end: "",
      background_image: "",
      created_at: "",
      slug: "",
    },
    is_final_phase: false,
  });

  async function handleSubmitMatch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // @ts-ignore
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const { day, hour, squad_home, squad_away, field } = data;

    const matches = await getAllMatchFinalPhase();
    const tournament = await getTournament(slug as string);

    await createMatchFinalPhase(
      matches.length + 1,
      day as string,
      hour as string,
      squad_home as string,
      squad_away as string,
      tournament[0].id,
      field as string,
      true
    );
  }

  const handleSelectCategory = async (event: any) => {
    setSelectedCategory(event);

    const data = await getSquadsByCategory(event);
    setSubcategories(data);
  };

  const handleChangeInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeSelectField = async (event: any) => {
    setForm({ ...form, ["field"]: event });
  };

  const handleChangeSelect = async (name: string, value: any) => {
    setForm({ ...form, [name]: { id: value } });

    if (name == "squad_home") setSelectedSquadHome(value);
    if (name == "squad_away") setSelectedSquadAway(value);
  };

  return (
    <div className="container">
      <h1 className="font-bold text-xl mb-3">Crea Match - Fasi finali</h1>

      <div className="[&_button]:bg-white">
        <Select name="category" onValueChange={handleSelectCategory}>
          <SelectTrigger className="w-full md:w-1/4 mb-3 ">
            <SelectValue placeholder="Seleziona una categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
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

      <form action="" onSubmit={handleSubmitMatch}>
        <div className="grid grid-cols-2 gap-2 mb-3 [&_button]:bg-white [&_input]:bg-white">
          <Input
            type="date"
            name="day"
            value={form.day}
            onChange={handleChangeInput}
          />
          <Input
            type="time"
            name="hour"
            value={form.hour}
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <div className="[&_button]:bg-white">
            <Select
              name="squad_home"
              onValueChange={(val) => handleChangeSelect("squad_home", val)}
            >
              <SelectTrigger className="w-full md:w-1/4 mb-3 ">
                <SelectValue placeholder="Seleziona una squadra">
                  {subcategories.find((squad) => squad.id == selectedSquadHome)
                    ?.name || "Seleziona una squadra"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {subcategories.map((squad, index) => {
                    return (
                      <SelectItem key={index} value={squad.id}>
                        {squad.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="[&_button]:bg-white">
            <Select
              name="squad_away"
              onValueChange={(val) => handleChangeSelect("squad_away", val)}
            >
              <SelectTrigger className="w-full md:w-1/4 mb-3 ">
                <SelectValue placeholder="Seleziona una squadra">
                  {subcategories.find((squad) => squad.id == selectedSquadAway)
                    ?.name || "Seleziona una squadra"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {subcategories.map((squad, index) => {
                    return (
                      <SelectItem key={index} value={squad.id}>
                        {squad.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit">Salva Partita</Button>
      </form>
    </div>
  );
}
