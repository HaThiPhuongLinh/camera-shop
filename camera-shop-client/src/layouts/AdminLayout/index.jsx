import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { adminMenuItems, socialIcons } from "../../components/Header/constants";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex flex-col">
      <header className="absolute container self-center max-w-[1185px] max-md:flex-wrap mt-10">
        <Header menuItems={adminMenuItems} socialIcons={socialIcons} />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
