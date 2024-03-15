// #LAYOUT
import DashboardLayout from "@/components/layouts/AdminLayout";
// #SUPABASE
import { getAllDays, getMatchesByDate } from "@/api/supabase";
// #MODELS
import { MatchDatum } from "@/models/Match";
// #UTILS
import { dateFormatItalian } from "@/utils/utils";
// #NEXT & REACT
import { GetServerSideProps } from "next";
import React, { useState } from "react";
// #UI COMPONENTS
import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/components/Breadcrumb";
import { MatchForm } from "@/components/forms/match-form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  daysProps: string[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const daysProps = await getAllDays();
    return {
      props: {
        daysProps,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

Update.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default function Update({ daysProps }: Props) {
  const breadcrumbItems = [
    { title: "Match", link: "/admin/match" },
    { title: "Inserisci risultati", link: "/admin/match/update" },
  ];

  const [selectedDay, setSelectedDay] = useState<MatchDatum[]>([]);

  const handleSelectDay = async (event: any) => {
    const data = await getMatchesByDate(event);
    setSelectedDay(data);
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-center justify-between">
          <Heading
            title="Inserisci i risultati"
            description="in questa sezione puoi inserire i risultati del torneo selezionando la giornata"
          />
        </div>
        <Separator />

        <Select onValueChange={handleSelectDay}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleziona la giornata" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {daysProps.map((day) => {
                return (
                  <SelectItem key={day} value={day}>
                    {dateFormatItalian(day)}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {selectedDay.map((item) => {
            return <MatchForm initialData={item} key={item.id} />;
          })}
        </div>
      </div>
    </ScrollArea>
  );
}
