

import { UserCon} from "../Context/UserContext"



const About = () => {
  const {dark}=UserCon()
  return (
    <div className={`flex min-h-screen items-center justify-center gap-10 px-4 py-10 transition-colors duration-300 lg:px-8 ${
        dark
          ? "bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900"
          : "bg-linear-to-br from-indigo-50 via-white to-blue-100"
      }`}>
    <img src="/about.svg" alt=""  className="h-screen  w-full"/ >


    </div>

  )
}
export default  About
