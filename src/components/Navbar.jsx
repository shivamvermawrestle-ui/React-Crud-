
import { Link, useNavigate } from "react-router-dom";
import { UserCon} from "../Context/UserContext";
import { FaReact } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
 import { IoMdArrowRoundForward } from "react-icons/io";
const Navbar = () => {
  const { user, setUser, dark, setDark } = UserCon()
  const navigate = useNavigate();

  const handleLogOut = () => {
    setUser(null);
    navigate("/loginpage");
  };

  const navLinkClass = `text-sm font-medium transition-colors duration-200 ${
    dark
      ? "text-slate-300 hover:text-blue-400"
      : "text-slate-600 hover:text-blue-600"
  }`;

  return (
    <nav
      className={`sticky top-0 z-50 border-b shadow-sm backdrop-blur-xl transition-colors duration-300 ${
        dark ? "border-slate-700 bg-slate-950" : "border-slate-200 bg-white/95"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-xl text-white shadow-md">
            <FaReact />
          </span>

          <div>
            <h1
              className={`text-xl font-extrabold tracking-tight ${
                dark ? "text-white" : "text-slate-900"
              }`}
            >
              ReactCurd<span className="text-blue-500">.</span>
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
              JSON SERVER
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 sm:gap-8">
          <Link to="/" className={navLinkClass}>
            Home
          </Link>

          <Link to="/about" className={navLinkClass}>
            About
          </Link>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/dashboard"
                  className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-4"
                >
                  Dashboard
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogOut}
                className={`rounded-xl border  px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                  dark
                    ? "border-slate-700 bg-slate-800 text-slate-200 hover:bg-red-600 hover:text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/loginpage"
              className="rounded-xl flex items-center gap-2 bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Login
<IoMdArrowRoundForward />
            </Link>
          )}

          {/* Global Theme Toggle */}
          <button
            type="button"
            onClick={() => setDark((prev) => !prev)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={dark}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition duration-200 sm:px-4 ${
              dark
                ? "border-slate-700 bg-slate-800 text-slate-100 transition-all duration-300  hover:bg-slate-700"
                : "border-slate-200 bg-slate-100 text-slate-700  transition-all duration-300  hover:bg-slate-200"
            }`}
          >
            {dark ? (
              <>
           
                <span className="flex items-center gap-2 ">Light      <MdLightMode size={20} /></span>
              </>
            ) : (
              <>
          
                <span className="flex items-center gap-2">Dark      <MdDarkMode size={20} /></span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
