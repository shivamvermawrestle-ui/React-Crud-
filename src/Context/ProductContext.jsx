import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const ProductContext = createContext();
export const ProductContextProvider = ({ children }) => {

   const [error, setError] = useState("");
  // AddProduct.JSX

  const [data, setData] = useState({
    image: "",
    name: "",
    price: "",
    category: "",
    stock: 10,
  });

  const [loading, setLoading] = useState(false);

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:3000/products", data);

      console.log(res.data);
      console.log("Product Added:", res.data);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

// PRODUCTLIST.JSX
  // Fetching Product
  const [product, setProduct] = useState([]);
  const fetchProduct = async () => {
    try {
         setLoading(true);
      const res = await axios.get("http://localhost:3000/products");
      setProduct(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  console.log(product);


  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProduct((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Getby ID
  


    

  return (
    <ProductContext.Provider
      value={{
        data,
        handleInputChange,
        handleSubmit,
        loading,
        fetchProduct,
        product,
        deleteProduct,
      error,
       setError
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const UseProdCon = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("use provider within the context");
  }
  return context;
};
