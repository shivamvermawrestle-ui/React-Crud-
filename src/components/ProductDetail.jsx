





import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserCon } from "../Context/UserContext";

const ProductDetail = () => {
  const {dark}=UserCon()
  const params = useParams();
  const id = params.id

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );

        setData(response.data);
      } catch (error) {
        console.log(error)
        setError("Product fetch nahi ho paya.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading product...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  if (!data) {
    return <p className="p-6">Product not found.</p>;
  }

  return (
    <>
   
<div
  className={`min-h-screen transition-colors duration-300 px-4 py-10 sm:px-6 lg:px-8 ${
    dark
      ? "bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 text-white"
      : "bg-linear-to-br from-indigo-50 via-white to-blue-100 text-slate-900"
  }`}
>
  <div className="mx-auto max-w-6xl flex flex-col gap-4 ">

    {/* Back Button */}
    <Link
      to="/"
      className={`inline-flex w-1/6 justify-center items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
        dark
          ? "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
          : "border border-slate-200 bg-white/80 text-slate-700 hover:bg-white hover:shadow-md"
      }`}
    >
      <span className="text-lg">←</span>
      Back to Products
    </Link>

    {/* Product Card */}
    <div
      className={`overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl transition-colors duration-300 ${
        dark
          ? "border-white/10 bg-slate-900/70 shadow-black/20"
          : "border-white/80 bg-white/90 shadow-indigo-200/40"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Product Image */}
        <div
          className={`relative flex min-h-[320px] items-center justify-center p-8 sm:p-12 lg:min-h-[560px] ${
            dark
              ? "bg-linear-to-br from-indigo-500/10 via-slate-800/50 to-slate-900"
              : "bg-linear-to-br from-indigo-100/80 via-white to-blue-100/80"
          }`}
        >
          <span
            className={`absolute z-10 left-6 top-6 rounded-full  px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
            dark
              ? "bg-blue-500 text-blue-100"
              : "bg-blue-100 border border-blue-700 text-blue-700"
          }`}
          >
            {data.category || "Product"}
          </span>

          <img
            src={data.image}
            alt={data.name}
            className="w-full max-w-md object-contain drop-shadow-xl rounded-xl transition-transform duration-500 hover:scale-105 sm:h-80 lg:h-[400px]"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center p-6 gap-4 sm:p-10 lg:p-12">

<div className="flex flex-col gap-2 ">

          <p
            className={` text-xs font-bold uppercase tracking-[0.2em] ${
              dark ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Product Details
          </p>

          <h1
            className={`text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            {data.name}
          </h1>
</div>

          {/* Price */}
          <div
            className={` rounded-xl border flex justify-between  items-center gap-1  p-5 ${
              dark
                ? "border-emerald-400/15 bg-emerald-400/5"
                : "border-emerald-100 bg-emerald-50/80"
            }`}
          >
            <div className="flex flex-col gap-1">
      <p
              className={`text-sm font-medium ${
                dark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Price
            </p>

            <p
              className={` text-3xl font-extrabold ${
                dark ? "text-emerald-400" : "text-emerald-700"
              }`}
            >
              ₹{data.price}
            </p>
            </div>

            <div className="flex flex-col gap-1 items-end">
         <p
    className={`rounded-lg border px-4 py-2 text-sm font-semibold ${
      data.stock > 0
        ? dark
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
          : "border-emerald-200 bg-emerald-50 text-emerald-700"
        : dark
          ? "border-red-400/30 bg-red-400/10 text-red-400"
          : "border-red-200 bg-red-50 text-red-700"
    }`}
  >
    {data.stock > 0 ? "● In Stock" : "● Out of Stock"}
  </p>
                <span
    className={`text-sm font-medium ${
      data.stock > 0
        ? dark
          ? "text-slate-300"
          : "text-slate-600"
        : dark
          ? "text-red-300/80"
          : "text-red-600"
    }`}
  >
    {data.stock > 0
      ? `${data.stock} units available`
      : "Currently unavailable"}
  </span>
            </div>
      
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <h2
              className={`text-lg font-bold ${
                dark ? "text-slate-100" : "text-slate-800"
              }`}
            >
              Description
            </h2>

            <p
              className={` text-sm leading-7 sm:text-base ${
                dark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {data.description || "No description available for this product."}
            </p>
          </div>

          {/* Category */}
          <div className=" flex flex-wrap items-center gap-3">
            <span
              className={`text-sm font-medium ${
                dark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Category:
            </span>

            <span
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                dark
                  ? "bg-indigo-400/10 text-indigo-300"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              {data.category || "Uncategorized"}
            </span>
          </div>

          {/* Bottom Accent */}
          <div
            className={`h-px w-full ${
              dark ? "bg-white/10" : "bg-slate-200"
            }`}
          />

          <p
            className={` text-xs ${
              dark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Product ID: {data.id}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
   
  );
};

export default ProductDetail;
