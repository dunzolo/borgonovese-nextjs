import { getAllCategories, getAllMatch } from "@/api/supabase";
import BreadCrumb from "@/components/Breadcrumb";
import DashboardLayout from "@/components/layouts/AdminLayout";
import { MatchClient } from "@/components/tables/match-table/client";
import { MatchDatum } from "@/models/Match";
import { handleRedirect } from "@/utils/supabase/redirect";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type Props = {
  matches: MatchDatum[];
  categories: string[];
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const responseRedirect = await handleRedirect(context);

  if (responseRedirect.redirect) return responseRedirect;

  try {
    const matches = await getAllMatch();
    const categories = await getAllCategories();
    return {
      props: {
        matches,
        categories,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

const breadcrumbItems = [{ title: "Match", link: "/admin/match" }];

export default function page({ matches, categories }: Props) {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <MatchClient data={matches} categories={categories} />
      </div>
    </>
  );
}
