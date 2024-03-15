import { GetServerSideProps } from "next";
import BreadCrumb from "@/components/Breadcrumb";
import { SquadClient } from "@/components/tables/squad-table/client";
import DashboardLayout from '@/components/layouts/AdminLayout';
import { getAllSquads } from '../../../api/supabase';
import { Squad } from "@/models/Squad";

type Props = {
  squads: Squad[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const squads = await getAllSquads();
    return {
      props: {
        squads,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

page.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

const breadcrumbItems = [{ title: "Squadre", link: "/admin/squad" }];

export default function page({ squads }: Props) {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <SquadClient data={squads} />
      </div>
    </>
  );
}