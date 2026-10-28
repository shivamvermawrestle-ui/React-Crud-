import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { UserCon } from "../../Context/UserContext";
import { FaUserEdit, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

const Update = () => {
  const {
    user: loggedInUser,
    setUser: setLoggedInUser,
    setUsers,
    dark,
  } = UserCon();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
  });


  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setFormData(response.data);
        console.log(response)
      } catch (err) {
        console.error(err);
        setError("User data could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSaving(true);

      const response = await axios.put(`http://localhost:3000/users/${id}`, formData);
      const updatedUser = response.data;

      if (setUsers) {
        setUsers((prevUsers) =>
          prevUsers.map((item) =>
            String(item.id) === String(id) ? updatedUser : item,
          ),
        );
      }

      if (
        loggedInUser &&
        String(loggedInUser.id) === String(id) &&
        setLoggedInUser
      ) {
        setLoggedInUser((prev) => ({ ...prev, ...updatedUser }));
      }

      alert("User updated successfully!");
      navigate("/dashboard/user-management");
    } catch (err) {
      console.error(err);
      setError("User update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Shared theme classes
  const pageClass = dark
    ? "bg-slate-950 text-white"
    : "bg-slate-100 text-slate-800";

  const cardClass = dark
    ? "bg-slate-900 border border-slate-800"
    : "bg-white border border-slate-200";

  const labelClass = dark ? "text-slate-200" : "text-slate-700";

  const inputClass = `w-full rounded-xl border px-4 py-3 outline-none transition
    ${
      dark
        ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        : "border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
    }`;

  // Loading screen
  if (loading) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center transition-colors duration-300 ${pageClass}`}
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <p className={dark ? "text-slate-300" : "text-slate-600"}>
            Loading user details...
          </p>
        </div>
      </div>
    );
  }

  // Error screen if user could not be loaded
  if (error && !formData?.id) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center p-6 transition-colors duration-300 ${pageClass}`}
      >
        <div
          className={`w-full max-w-md rounded-2xl p-8 text-center shadow-xl ${cardClass}`}
        >
          <p className="mb-5 text-red-500">{error}</p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/user-management")}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-white transition hover:bg-indigo-700"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen items-center justify-center p-4 transition-colors duration-300 sm:p-8 ${
        dark
          ? "bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900"
          : "bg-linear-to-br from-slate-100 via-indigo-50 to-slate-200"
      }`}
    >
      <div
        className={`w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl transition-colors duration-300 ${
          cardClass
        } ${dark ? "shadow-black/30" : "shadow-slate-300/50"}`}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-8 sm:px-10">
          <button
            type="button"
            onClick={() => navigate("/dashboard/user-management")}
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-100 transition hover:text-white"
          >
            <FaArrowLeft />
            Back to User Management
          </button>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20">
              <FaUserEdit size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Edit User
              </h1>
              <p className="mt-1 text-sm font-medium text-indigo-100">
                Update the user's information below.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-6 p-6 sm:p-10">
          {error && (
            <div
              role="alert"
              className={`rounded-xl border px-4 py-3 text-sm ${
                dark
                  ? "border-red-900 bg-red-950/50 text-red-300"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className={`text-sm font-semibold ${labelClass}`}
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData?.name ?? ""}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className={`text-sm font-semibold ${labelClass}`}
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData?.email ?? ""}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className={`text-sm font-semibold ${labelClass}`}
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData?.phone ?? ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label
                htmlFor="role"
                className={`text-sm font-semibold ${labelClass}`}
              >
                User Role
              </label>

              <select
                id="role"
                name="role"
                value={formData?.role ?? "user"}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div
            className={`flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end ${
              dark ? "border-slate-700" : "border-slate-100"
            }`}
          >
            <button
              type="button"
              onClick={() => navigate("/dashboard/user-management")}
              className={`rounded-xl border px-6 py-3 font-semibold transition ${
                dark
                  ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
