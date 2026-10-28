
import { Link } from "react-router-dom"

import { UserCon } from "../Context/UserContext"
import { UseProdCon } from "../Context/ProductContext"





const ProductCard = () => {

    const {dark}=UserCon()
    const {product,loading}=UseProdCon()

if(loading){
  return 
}
  return (
<>


<div className="grid grid-cols-1 w-full gap-5  sm:grid-cols-2 lg:grid-cols-4">

{
    product.map((p)=>(
  <Link key={p.id} to={`/product-detail/${p.id}`}
      className={` overflow-hidden  rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        dark
          ? "border-slate-700 bg-slate-900 hover:border-blue-500/50"
          : "border-slate-200 bg-white hover:border-blue-300"
      }`}
    >
      {/* Product Image */}
      <div
        className={`relative flex  items-center justify-center overflow-hidden ${
          dark ? "bg-slate-800" : "bg-slate-100"
        }`}
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="object-fit w-full   h-64  transition-transform duration-500  "
        />

        {/* Category Badge */}
        <span
          className={`absolute left-3 top-3    rounded-full px-3 py-1 text-xs font-semibold ${
            dark
              ? "bg-blue-500 text-blue-100"
              : "bg-blue-100 border  border-blue-700 text-blue-700"
          }`}
        >
          {p.category}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col gap-2">
        <h2
          className={`truncate text-lg font-bold ${
            dark ? "text-white" : "text-slate-900"
          }`}
        >
          {p.name || "-"}
        </h2>

        <p
          className={`text-2xl font-bold ${
            dark ? "text-blue-400" : "text-blue-600"
          }`}
        >
          ₹{Number(p.price || 0).toLocaleString("en-IN")}
        </p>

        {/* Stock Details */}
        <div
          className={`flex flex-wrap items-center  pt-2  justify-between gap-2 border-t lg:flex-no-wrap  ${
            dark ? "border-slate-700" : "border-slate-100"
          }`}
        >
              <p
    className={`rounded-lg border px-3  py-1 text-xs text-nowrap font-semibold ${
      p.stock > 0
        ? dark
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
          : "border-emerald-200 bg-emerald-50 text-emerald-700"
        : dark
          ? "border-red-400/30 bg-red-400/10 text-red-400"
          : "border-red-200 bg-red-50 text-red-700"
    }`}
  >
    {p.stock > 0 ? "● In Stock" : "● Out of Stock"}
  </p>

              <span
    className={`text-xs font-medium ${
      p.stock > 0
        ? p
          ? "text-slate-300"
          : "text-slate-600"
        : p
          ? "text-red-300/80"
          : "text-red-600"
    }`}
  >
    {p.stock > 0
      ? `${p.stock} units available`
      : " Unavailable"}
  </span>
          
        </div>

    <div className="flex  flex-col gap-2 sm:flex-row sm:items-center">

  {/* Buy Now Button */}
  <button
    className={`flex w-full items-center justify-center gap-2  text-nowrap rounded-md px-4 py-2 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${
      dark
        ? "bg-linear-to-r from-indigo-500 to-blue-500 shadow-blue-500/20   hover:from-indigo-400 hover:to-blue-400"
        : "bg-linear-to-r from-indigo-600 to-blue-600 shadow-blue-600/20  hover:from-indigo-500 hover:to-blue-500"
    }`}
  >

    Buy Now
  </button>

  {/* Add to Cart Button */}
  <button
    className={` flex w-full items-center justify-center  text-nowrap gap-2 rounded-md border px-4 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${
      dark
        ? "border-indigo-400/40 bg-indigo-400/10 text-indigo-300 hover:border-indigo-400/70 hover:bg-indigo-400/20"
        : "border-indigo-200 bg-indigo-50 text-indigo-700 hover:border-indigo-400 hover:bg-indigo-100"
    }`}
  >

    Add to Cart
  </button>

</div>
        
      </div>
    </Link>

    ))
}
  
</div>


</>
  )
}

export default ProductCard