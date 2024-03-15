import BreadCrumb from "@/components/Breadcrumb";
import { SquadForm } from "@/components/forms/squad-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import DashboardLayout from '@/components/layouts/AdminLayout';
import { GetServerSideProps } from "next";
import { getAllCategories, getAllSquads } from "@/api/supabase";
import { Squad } from "@/models/Squad";

type Props = {
    categoriesProps: string[]
    squadsProps: Squad[]
  }

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const categoriesProps = await getAllCategories();
        const squadsProps = await getAllSquads()
        return {
            props: {
                categoriesProps,
                squadsProps
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
  };


page.getLayout = (page : any) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default function page({categoriesProps, squadsProps} : Props) {
  const breadcrumbItems = [
    { title: "Squadre", link: "/admin/squad" },
    { title: "Crea", link: "/admin/squad/create" },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <SquadForm
          categories={categoriesProps}
          totalSquad={squadsProps.length}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}