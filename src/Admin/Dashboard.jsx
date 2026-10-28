import { Link, Outlet, useLocation } from "react-router-dom";

import { UserCon} from "../Context/UserContext";
import { MdDashboard, MdPeople } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
const Dashboard = () => {
  const { dark } = UserCon()
  const location = useLocation();

  const links = [
    {
      to: "/dashboard",
      label: "Overview",
      icon: <MdDashboard size={21} />,
      end: true,
    },
    {
      to: "/dashboard/user-management",
      label: "User Management",
      icon: <MdPeople size={21} />,
      end: false,
    },
    {
      to: "/dashboard/product-management",
      label: "Product Management",
      icon: <AiFillProduct size={21} />,
      end: false,
    },
  ];

  return (
    <div
      className={`flex min-h-screen w-full transition-colors duration-300 ${
        dark ? "bg-slate-950" : "bg-slate-100"
      }`}
    >
      {/* Left Sidebar */}
      <aside
        className={`fixed left-0 z-40 h-screen w-64 border-r shadow-md transition-colors duration-300 ${
          dark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
        }`}
      >
        {/* Sidebar Header */}
        <div
          className={`border-b px-5 py-6 flex flex-col gap-1 ${
            dark ? "border-slate-800" : "border-slate-200"
          }`}
        >
          <p className=" text-xs font-semibold uppercase tracking-widest text-blue-500">
            ReactCurd
          </p>

          <h2
            className={`text-xl font-bold ${
              dark ? "text-white" : "text-slate-800"
            }`}
          >
            Admin Panel
          </h2>

          <p
            className={` text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}
          >
            Manage your application
          </p>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-2 p-4">
          <p
            className={`mb-2 px-3 text-xs font-semibold uppercase tracking-wider ${
              dark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Main Menu
          </p>

          {links.map((item) => {
            const isActive = item.end
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : dark
                      ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Right Content */}
      <main
        className={`ml-64 min-h-screen min-w-0 flex-1 p-4 transition-colors duration-300 sm:p-6 ${
          dark ? "bg-slate-950" : "bg-slate-100"
        }`}
      >
        <div
          className={`min-h-[calc(100vh-3rem)] rounded-2xl transition-colors duration-300 ${
            dark ? "bg-slate-900" : "bg-white shadow-sm"
          }`}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
