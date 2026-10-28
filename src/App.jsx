import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";

const AddUser = lazy(() => import("./Admin/UserManagement/AddUser"));
const Update = lazy(() => import("./Admin/UserManagement/Update"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./Admin/Dashboard"));
const UserManagement = lazy(() => import("./Admin/UserManagement/UserManagement"),);
const AdminOverview = lazy(() => import("./Admin/AdminOverview"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const ProductList = lazy(() => import("./Admin/Product Management/ProductList"),);
const AddProduct = lazy(() => import("./Admin/Product Management/AddProduct"));
const UpdateProduct = lazy(() => import("./Admin/Product Management/UpdateProduct"),);

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginpage" element={<Login />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/about" element={<About />} />
        <Route path="/updateuser/:id" element={<Update />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<AdminOverview />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="product-management" element={<ProductList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
