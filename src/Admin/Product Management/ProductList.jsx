import { MdModeEdit, MdDelete, MdSearch, MdPersonAdd } from "react-icons/md";
import { Link } from "react-router-dom";

import { UseProdCon } from "../../Context/ProductContext";

import { UserCon } from "../../Context/UserContext";
import { useState } from "react";

const ProductList = () => {
  const { deleteProduct, product = [] } = UseProdCon();
  const { dark } = UserCon();
  console.log(product);
  const [search, setSearch] = useState("");

  const filteredProducts = product.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.id?.toLowerCase().includes(search.toLowerCase()),
  );
  console.log(filteredProducts);

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
              ADMIN PANEL / Products
            </p>
            <h1 className={` text-3xl font-bold tracking-tight ${heading}`}>
              Product Management
            </h1>
            <p className={` text-sm ${muted}`}>Manage Products</p>
          </div>

          <div
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-sm ${card}`}
          >
            <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-500">
              <MdPersonAdd size={22} />
            </div>
            <div>
              <p className={`text-xs ${muted}`}>Total Products</p>
              <p className={`text-xl font-bold ${heading}`}>{product.length}</p>
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
              <h2 className={`text-lg font-semibold ${heading}`}>
                All Products
              </h2>
              <p className={`mt-1 text-sm ${muted}`}>
                {filteredProducts.length} product found
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
                  {[
                    "S.No.",
                    "Product ",
                    "Name",
                    "Price",
                    "Category",
                    "Stock",
                    "Actions",
                  ].map((headingText) => (
                    <th
                      key={headingText}
                      className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider ${muted}`}
                    >
                      {headingText}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className={`divide-y ${borderColor}`}>
                {filteredProducts.length > 0 ? (
                  filteredProducts?.map((u, i) => (
                    <tr key={u?.id} className={`transition-colors ${rowHover}`}>
                      <td className={`px-6 py-5 text-sm ${muted}`}>
                        {String(i + 1).padStart(2, "0")}
                      </td>

                      <td className="px-6 py-5">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img
                            src={u?.image}
                            className="object-contain"
                            alt={u?.name}
                          />
                        </div>
                      </td>

                      <td className={`px-6 py-5 text-sm ${muted}`}>
                        {u?.name || "—"}
                      </td>

                      <td className={`px-6 py-5 text-sm ${muted}`}>
                        {u?.price || "—"}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            u?.category === "Tech"
                              ? dark
                                ? "bg-emerald-500/15 text-emerald-400"
                                : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                              : dark
                                ? "bg-indigo-500/15 text-indigo-300"
                                : "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200"
                          }`}
                        >
                          {u?.category}
                        </span>
                      </td>
                      <td className={`px-6 py-5 text-sm ${muted}`}>
                        {u?.stock || "—"}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/update-product/${u?.id}`}
                            aria-label={`Edit ${u?.name || "Product"}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-sm font-medium text-indigo-500 transition hover:bg-indigo-600 hover:text-white"
                          >
                            <MdModeEdit size={17} />
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() => {
                          { deleteProduct(u?.id) }
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-600 hover:text-white"
                            oncl
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
                        src="/product.svg"
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
              Showing {filteredProducts.length} of {product.length} product
            </p>
            <div className="flex flex-col  items-end gap-1">
              <Link
                className="inline-flex items-center gap-1.5 rounded-lg border border-green-500/30 bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700  active:scale-95"
                to={"/addproduct"}
              >
                Add Product
              </Link>
              <p className={`text-xs ${muted}`}>Product Management Dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
