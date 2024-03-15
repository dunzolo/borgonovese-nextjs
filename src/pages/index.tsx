import RootLayout from "@/components/layouts/RootLayout";

Home.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};

export default function Home() {
  return (
    <div>
      <main><h1>Home page</h1></main>
    </div>
  );
}

