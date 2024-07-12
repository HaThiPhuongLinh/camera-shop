import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
  defaultMenuItems,
  socialIcons,
} from "../../constants/menuItems";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col">
      <header className="absolute container self-center max-w-[1185px] max-md:flex-wrap mt-10">
        <Header menuItems={defaultMenuItems} socialIcons={socialIcons} />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default DefaultLayout;
