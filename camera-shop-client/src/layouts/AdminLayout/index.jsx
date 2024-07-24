import Header from "../../components/DashBoard/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/DashBoard/Sidebar";

const AdminLayout = () => {
  return (
    <div className=" bg-neutral-100 h-screen flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
