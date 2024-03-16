import Header from "@/components/header/Header";

const RootLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  );
};

export default RootLayout;
