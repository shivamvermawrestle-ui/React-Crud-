
import { MdModeEdit, MdDelete, MdSearch, MdPersonAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { UserCon} from "../../Context/UserContext";
import { useState } from "react";

const UserManagement = () => {
  const { handleDelete, users = [], dark } = UserCon()
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );
  console.log(filteredUsers)

  const heading = dark ? "text-white" : "text-slate-800";
  const muted = dark ? "text-slate-400" : "text-slate-500";
  const card = dark
    ? "border-slate-700 bg-slate-900"
    : "border-slate-200 bg-white";
  const tableHead = dark ? "bg-slate-800" : "bg-slate-50";
  const rowHover = dark ? "hover:bg-slate-800" : "hover:bg-slate-50";
  const borderColor = dark ? "divide-slate-700" : "divide-slate-100";

  return (
    <div
      className={`min-h-screen rounded-2xl p-4 transition-colors duration-300 sm:p-6 lg:p-8 ${
        dark ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex  flex-col  gap-1 ">
            <p className="text-sm font-medium text-indigo-500">
              ADMIN PANEL / USERS
            </p>
            <h1 className={` text-3xl font-bold tracking-tight ${heading}`}>
              User Management
            </h1>
            <p className={` text-sm ${muted}`}>
              Manage users, roles and account details.
            </p>
          </div>

          <div
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-sm ${card}`}
          >
            <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-500">
              <MdPersonAdd size={22} />
            </div>
            <div>
              <p className={`text-xs ${muted}`}>Total Users</p>
              <p className={`text-xl font-bold ${heading}`}>{users.length}</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className={`overflow-hidden rounded-2xl border shadow-sm ${card}`}>
          {/* Search Header */}
          <div
            className={`flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between ${
              dark ? "border-slate-700" : "border-slate-100"
            }`}
          >
            <div>
              <h2 className={`text-lg font-semibold ${heading}`}>All Users</h2>
              <p className={`mt-1 text-sm ${muted}`}>
                {filteredUsers.length} users found
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <MdSearch
                size={22}
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${muted}`}
              />
              <input
                type="text"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${
                  dark
                    ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                    : "border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400"
                }`}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-center">
              <thead className={tableHead}>
                <tr>
                  {["S.No.", "User", "Email", "Phone", "Role", "Actions"].map(
                    (headingText) => (
                      <th
                        key={headingText}
                        className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider ${muted}`}
                      >
                        {headingText}
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              <tbody className={`divide-y ${borderColor}`}>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u, i) => (
                    <tr key={u.id} className={`transition-colors ${rowHover}`}>
                      <td className={`px-6 py-5 text-sm ${muted}`}>
                        {String(i + 1).padStart(2, "0")}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3 text-left">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 font-bold uppercase text-indigo-500">
                            {u.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <p className={`font-semibold ${heading}`}>
                              {u.name || "Unnamed User"}
                            </p>
                            <p className={`text-xs ${muted}`}>ID: {u.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className={`px-6 py-5 text-sm ${muted}`}>
                        {u.email || "—"}
                      </td>

                      <td className={`px-6 py-5 text-sm ${muted}`}>
                        {u.phone || "—"}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            u.role === "admin"
                              ? dark
                                ? "bg-emerald-500/15 text-emerald-400"
                                : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                              : dark
                                ? "bg-indigo-500/15 text-indigo-300"
                                : "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200"
                          }`}
                        >
                          {u.role || "user"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/updateuser/${u.id}`}
                            aria-label={`Edit ${u.name || "user"}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-sm font-medium text-indigo-500 transition hover:bg-indigo-600 hover:text-white"
                          >
                            <MdModeEdit size={17} />
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to delete ${
                                    u.name || "this user"
                                  }?`,
                                )
                              ) {
                                handleDelete(u.id);
                              }
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-600 hover:text-white"
                          >
                            <MdDelete size={17} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <img
                        src="/user.svg"
                        alt=""
                        className="mx-auto mb-4 w-40"
                      />
                      <div
                        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
                          dark
                            ? "bg-slate-800 text-slate-400"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <MdSearch size={28} />
                      </div>
                      <h3 className={`mt-4 font-semibold ${heading}`}>
                        No users found
                      </h3>
                      <p className={`mt-1 text-sm ${muted}`}>
                        Try searching with a different name or email.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div
            className={`flex flex-col gap-2 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
              dark
                ? "border-slate-700 bg-slate-800/60"
                : "border-slate-100 bg-slate-50/70"
            }`}
          >
            <p className={`text-sm ${muted}`}>
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <p className={`text-xs ${muted}`}>User Management Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
