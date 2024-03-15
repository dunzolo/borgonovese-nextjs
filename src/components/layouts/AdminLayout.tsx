import AdminHeader from "@/components/header/AdminHeader";
import AdminSidebar from "../sidebar/AdminSidebar";
import { Toaster } from "@/components/ui/toaster";
import AdminFooter from "../footer/AdminFooter";
import { footerAdminItems } from "@/constants/data";

const DashboardLayout = ({ children }: any) => {
  return (
    <>
      <AdminHeader />
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="w-full pt-16">{children}</main>
        <Toaster />
      </div>
      <AdminFooter items={footerAdminItems} />
    </>
  );
};

export default DashboardLayout;
