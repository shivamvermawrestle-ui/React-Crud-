
import { UserCon} from "../Context/UserContext"

import ProductCard from "../components/ProductCard"




const Home = () => {
  const {dark}=UserCon()
  return (
    <div className={`flex min-h-screen flex-col items-center justify-center  transition-colors duration-300 lg:px-8 ${
        dark
          ? "bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900"
          : "bg-linear-to-br from-indigo-50 via-white to-blue-100"
      }`}>
    {/* <img src="/home.svg" alt=""  className="h-screen  w-full"/ > */}
<div className="flex flex-col gap-4 p-10 ">
<h1 className={` font-bold text-2xl ${dark?"text-white":"text-slate-900"}`}>All Products</h1>
<ProductCard/>

</div>

    </div>

  )
}

export default Home
