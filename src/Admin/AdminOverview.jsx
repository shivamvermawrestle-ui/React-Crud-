
import { UserCon } from "../Context/UserContext";

const AdminOverview = () => {
  const { dark } = UserCon()
  const heading = dark ? "text-white" : "text-slate-800";
  const muted = dark ? "text-slate-400" : "text-slate-500";
  return (
    <>
      <div
        className={`min-h-screen rounded-2xl p-4 transition-colors duration-300 sm:p-6 lg:p-8 ${
          dark ? "bg-slate-950" : "bg-slate-50"
        }`}
      >
        <div className="flex flex-col gap-1 ">
          <p className="text-sm uppercase font-medium text-indigo-500">
            ADMIN PANEL / Overview
          </p>
          <h1 className={`text-3xl font-bold tracking-tight ${heading}`}>
            Overview
          </h1>
          <p className={`text-sm ${muted}`}>
            Overview of Featured Users, roles and account details.
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminOverview
