import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import Register from "./components/UserManagement/register";
import Login from "./components/UserManagement/login";
import Test from "./components/UserManagement/test";
import Home from "./components/Home";
import Footer from "./components/inc/footer";

import DeliveryManagament from "./components/DeliveryManagement/DeliveryManagament";
import DriverManagament from "./components/DeliveryManagement/DriverManagement";
import OrderTracking from "./components/DeliveryManagement/OrderTracking";
import Dashboard from "./components/dashboard/dashboard";
import DashboardHome from "./components/dashboard/dashboardHome";
import AddEmployee from "./components/dashboard/add-employee";
import EditEmployee from "./components/dashboard/edit-employee";
import ProductAdmin from "./components/dashboard/product";
import ProductList from "./components/dashboard/productList";
import AllEmployees from "./components/dashboard/allEmployees";
import Analytics from "./components/dashboard/analytics";

import Product from "./components/ProductManagement/Product";
import Management from "./components/ProductManagement/ProductManagement";
import AddProduct from "./components/ProductManagement/AddProduct";
import UpdateProduct from "./components/ProductManagement/UpdateProduct";
import ProductDetails from "./components/ProductDetails";

import AddtailoringInfo from "./components/CustomTailoring/AddtailoringInfo";
import TailoringCart from "./components/CustomTailoring/TailoringCart";

import MembershipForm from "./components/MembershipManagement/membershipForm";
import MembershipCategory from "./components/MembershipManagement/membershipCategory";
import AllMembership from "./components/MembershipManagement/AllMembershipDetail";
import EditMembership from "./components/MembershipManagement/editMembershipForm";
import MembershipPayment from "./components/MembershipManagement/membershipPayment";
import Form from "./components/MembershipManagement/form";

import Header from "./components/inc/header";
import "bootstrap/dist/css/bootstrap.css";

import About from "./components/About";

import Cart from "./components/orderManagement/cart";
import Checkout from "./components/orderManagement/checkout";
import AddOrder from "./components/orderManagement/addOrder";
import GetOrder from "./components/orderManagement/getAllOreder";

import UpdateOrder from "./components/orderManagement/editOders";

import Finance from './components/finance management/addFinance';
import FinanceChart from './components/finance management/editFinance';

import AddPayment from './components/paymentmanagement/AddPayment';
import AllPayments from './components/paymentmanagement/AllPayments';
import HomePayment from './components/paymentmanagement/HomePayment';
import OnePayment from './components/paymentmanagement/OnePayment';
import OneUpdatePayment from './components/paymentmanagement/OneUpdatePayment';
import UpdatePayment from './components/paymentmanagement/UpdatePayment';
import PromotionPaymentUI from './components/paymentmanagement/promotionPaymentUI';


import ProductDashboard from './components/ProductManagement/product-dashbaord';


function App() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const loggedRole = localStorage.getItem("role");


  const [code, setCode] = useState('');

  function generateCode() {
    let code = '';
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 6; i++) {
      code += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }

    return code;
  }

  function handlePromotionCodeClick() {
    const newCode = generateCode();
    setCode(newCode);

  }


  // const location = useLocation();
  // console.log(location)

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/admin/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="view-employees" element={<AllEmployees />} />
          <Route path="edit-employee/:id" element={<EditEmployee />} />
          <Route path="addOrder" element={<AddOrder />} />
          <Route path="getOrders" element={<GetOrder />} />
          <Route path="allMembership" element={<AllMembership />} />
        <Route path="editMembership/:id" element={<EditMembership />} />
          <Route path="updateOrders/:id" element={<UpdateOrder />} />
          <Route path="productList" element={<ProductList />} />
          <Route path="delivery-management" element={<DeliveryManagament />} />
          <Route path="driver-management" element={<DriverManagament />} />
          <Route exact path="AllPayments.js" element={<AllPayments />} />
          <Route exact path="updatePayment/:id" element={<UpdatePayment />} />
        </Route>
        <Route
          path="/"
          element={isLoggedIn === "true" ? <Home /> : <Login />}
        />

        {/* Custom Tailoring */}
        <Route path="/AddtailoringInfo" element={<AddtailoringInfo />}></Route>
        <Route path="/TailoringCart" element={<TailoringCart />}></Route>

        {/* Product Management */}
        <Route path="/products" element={<Product />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route
          path="/management"
          element={
            isLoggedIn === "true" && loggedRole === "product" ? (
              <Management />
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/addproduct"
          element={
            isLoggedIn === "true" && loggedRole === "product" ? (
              <AddProduct />
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/updateproduct/:id"
          element={
            isLoggedIn === "true" && loggedRole === "product" ? (
              <UpdateProduct />
            ) : (
              <Login />
            )
          }
        ></Route>

        {/* Membership M\anagement */}
        
        <Route path="/membership-form" element={<MembershipForm />} />
        <Route path="/membership-category" element={<MembershipCategory />} />
        
        <Route path="/membershipPayments" element={<MembershipPayment />} />
        <Route path="/form" element={<Form />} />

        {/* Payment Management */}

          <Route exact path="/homePayment" element={<HomePayment />} />
         
          <Route exact path="/OnePayment/:id" element={<OnePayment />} />
        
          <Route exact path="/addPayment" element={<AddPayment />} />
          <Route exact path="/promotionPayment" element={<PromotionPaymentUI code={code} handlePromotionCodeClick={handlePromotionCodeClick} />} />
          <Route exact path="/OneUpdatePayment/:id" element={<OneUpdatePayment />} />

        {/* Order Management */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        


        <Route path="/button-click" element={<ProductDashboard />} />



        {/* finance mangement */}

        <Route
          path="/finance"
          element={
            isLoggedIn === "true" && loggedRole === "finance" ? (
              <Finance/>
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/finance/chart"
          element={
            isLoggedIn === "true" && loggedRole === "finance" ? (
              <FinanceChart/>
            ) : (
              <Login />
            )
          }
        ></Route>

        



        <Route path="/about" element={<About />} />
        


      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
