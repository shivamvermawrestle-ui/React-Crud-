
import axios from "axios";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserCon } from "../Context/UserContext";
import { FaReact } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const { setUser, setLoading, dark } = UserCon()
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      setError("");
      setLoading(true);

      const response = await axios.get("http://localhost:3000/users");

      const matchedUser = response.data.find(
        (user) =>
          user.email?.trim().toLowerCase() ===
            data.email.trim().toLowerCase() &&
          user.password === data.password
      );

      if (matchedUser) {
        setUser(matchedUser);
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

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
          src="/mobilelogin.svg"
          alt="Login illustration"
          className="w-full max-w-[520px] object-contain"
        />
      </div>

      {/* Login Card */}
      <div
        className={`flex w-full max-w-md flex-col gap-6 rounded-3xl border p-6 shadow-2xl transition-colors duration-300 sm:p-9 ${
          dark
            ? "border-slate-800 bg-slate-900 shadow-black/30"
            : "border-white bg-white shadow-indigo-100"
        }`}
      >
        {/* Logo and Heading */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-3xl text-white shadow-lg shadow-indigo-500/20">
            <FaReact />
          </div>

          <div className="flex flex-col gap-2 text-center">
            <h1
              className={`text-3xl font-bold tracking-tight ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              Welcome Back!
            </h1>

            <p
              className={`text-sm font-medium ${
                dark ? "text-slate-400" : "text-gray-500"
              }`}
            >
              Sign in to continue to your account
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
              })}
              className={inputClass}
            />

            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                className={`${inputClass} pr-16`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-indigo-500 transition hover:text-indigo-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* API Error */}
          {error && (
            <div
              role="alert"
              className={`rounded-xl border px-4 py-3 text-sm ${
                dark
                  ? "border-red-900 bg-red-950/50 text-red-300"
                  : "border-red-100 bg-red-50 text-red-600"
              }`}
            >
              {error}
            </div>
          )}

          {/* Submit and Registration */}
          <div className="flex flex-col items-center gap-4 pt-1">
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0"
            >
              Sign In <span className="ml-1">→</span>
            </button>

            <p
              className={`text-center text-sm font-medium ${
                dark ? "text-slate-400" : "text-gray-500"
              }`}
            >
              Don't have an account?{" "}
              <Link
                to="/adduser"
                className="font-semibold text-indigo-500 hover:text-indigo-400 hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


