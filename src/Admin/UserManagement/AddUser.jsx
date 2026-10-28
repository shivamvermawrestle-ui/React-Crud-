
import { UserCon} from "../../Context/UserContext";
import { Link } from "react-router-dom";
import { FaReact } from "react-icons/fa";

const AddUser = () => {
  const {
    show,
    loading,
    handleInputChange,
    handleSubmit,
    formData,
    setShow,
    dark,
  } = UserCon()

  const inputClass = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
    dark
      ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
      : "border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
  }`;

  const labelClass = `text-sm font-semibold ${
    dark ? "text-slate-200" : "text-gray-700"
  }`;

  return (
    <div
      className={`flex min-h-screen items-center justify-center gap-10 px-4 py-10 transition-colors duration-300 lg:px-8 ${
        dark
          ? "bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900"
          : "bg-linear-to-br from-indigo-50 via-white to-blue-100"
      }`}
    >
      {/* Illustration */}
      <div className="hidden max-w-xl flex-1 justify-center lg:flex">
        <img
          src="/form.svg"
          alt="Create account illustration"
          className="w-full max-w-[520px]     object-contain"
        />
      </div>

      {/* Registration Card */}
      <div
        className={`flex w-full max-w-lg flex-col gap-6 rounded-3xl border p-6 shadow-2xl transition-colors duration-300 sm:p-9 ${
          dark
            ? "border-slate-800 bg-slate-900 shadow-black/30"
            : "border-white bg-white shadow-indigo-100"
        }`}
      >
        {/* Logo and Heading */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-3xl text-white shadow-lg shadow-indigo-500/20">
            <FaReact />
          </div>

          <div className="flex flex-col gap-2 text-center">
            <h1
              className={`text-3xl font-bold tracking-tight ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              Create Account
            </h1>

            <p
              className={`text-sm font-medium ${
                dark ? "text-slate-400" : "text-gray-500"
              }`}
            >
              Fill in your details to get started
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className={labelClass}>
              Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className={labelClass}>
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              autoComplete="tel"
              required
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={show ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                autoComplete="new-password"
                required
                className={`${inputClass} pr-16`}
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-indigo-500 transition hover:text-indigo-400"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit and Login Link */}
          <div className="flex flex-col gap-4 pt-3 text-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>

            <p
              className={`text-sm font-medium ${
                dark ? "text-slate-400" : "text-gray-500"
              }`}
            >
              Already have an account?{" "}
              <Link
                to="/loginpage"
                className="font-semibold text-indigo-500 hover:text-indigo-400 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
