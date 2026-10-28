import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { UserCon } from "../../Context/UserContext";
import { UseProdCon } from "../../Context/ProductContext";

const UpdateProduct = () => {
  const { loading, error, setError } = UseProdCon();
  const { dark } = UserCon();
  const [data, setData] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  // Get product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setError("");

        const response = await axios.get(
          `http://localhost:3000/products/${id}`,
        );
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.log(error);
        setError("Product could not be loaded.");
      }
    };

    fetchProduct();
  }, [id]);

  console.log(data);

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/products/${id}`,
        data,
      );
      console.log(response);
      alert("Product updated sucessfully");
    } catch (error) {
      console.log(error);
    }
  };
  // Handle input changes
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const pageClass = dark
    ? "bg-slate-950 text-white"
    : "bg-slate-100 text-slate-800";

  const cardClass = dark
    ? "border border-slate-800 bg-slate-900"
    : "border border-slate-200 bg-white";
  const inputClass = `w-full rounded-xl border px-4 py-3 outline-none transition
    ${
      dark
        ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        : "border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
    }`;
  if (loading) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${pageClass}`}
      >
        Loading product...
      </div>
    );
  }

  if (error && !data?.id) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${pageClass}`}
      >
        <div className="text-center">
          <p className="mb-4 text-red-500">{error}</p>
          <button
            onClick={() => navigate("/dashboard/product-management")}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-white"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 sm:p-8 ${pageClass}`}>
      <div
        className={`mx-auto max-w-2xl overflow-hidden rounded-2xl shadow-xl ${cardClass}`}
      >
        <div className="flex flex-col gap-2 bg-indigo-600 p-6 text-white">
          <button
            type="button"
            onClick={() => navigate("/dashboard/product-management")}
            className=" flex items-center gap-2  text-sm"
          >
            <FaArrowLeft /> Back to Products
          </button>
          <div className="flex flex-col gap-1 ">
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <p className=" text-sm text-indigo-100">
              Update your product information.
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4 p-6">
          {error && (
            <p className="rounded-lg bg-red-100 p-3 text-red-600">{error}</p>
          )}

          <div className="flex flex-col gap-1">
            <label className="block">Image URL</label>
            <input
              id="image"
              type="text"
              name="image"
              value={data?.image ?? ""}
              onChange={handleChange}
              placeholder="Enter image URL"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="block">Product Name</label>
            <input
              type="text"
              name="name"
              value={data?.name ?? ""}
              onChange={handleChange}
              placeholder="Enter product name"
              className={inputClass}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className=" block">Price</label>
            <input
              type="number"
              name="price"
              value={data?.price ?? ""}
              onChange={handleChange}
              placeholder="Enter price"
              className={inputClass}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="block">Category</label>
            <input
              type="text"
              name="category"
              value={data?.category ?? ""}
              onChange={handleChange}
              placeholder="Enter category"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="block">Stock</label>
            <input
              type="number"
              name="stock"
              value={data?.stock ?? ""}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/dashboard/product-management")}
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
              className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
