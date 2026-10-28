import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const userContext = createContext();

export const UserContextProvider = ({ children }) => {
const [dark, setDark] = useState(
  () => localStorage.getItem("theme") === "dark"
);

useEffect(() => {
  localStorage.setItem("theme", dark ? "dark" : "light");
  document.documentElement.classList.toggle("dark", dark);
}, [dark]);


  // USERMANAGEMENT.JSX

  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);


  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //   ADDUSER.JSX
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Input fields ka data update karna
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form submit karna
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/users",
        formData
      );
      console.log(res.data)
      console.log("User Added:", res.data);
      alert("User added successfully!");
      navigate("/")

    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <userContext.Provider value={{ users, user, setUser, setUsers, fetchUsers, handleDelete, show, loading, setLoading, handleInputChange, handleSubmit, formData, setShow, navigate,dark,setDark }}>
      {children}
    </userContext.Provider>
  );
};

export const UserCon=()=>{
  const context = useContext(userContext)
  if(!context){
    throw new Error("place provider within the element")
  }
  return context
}
