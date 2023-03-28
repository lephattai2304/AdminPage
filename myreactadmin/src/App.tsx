import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./secure/dashboard/Dashboard";
import { BrowserRouter, Navigate, Route, Routes , useParams} from 'react-router-dom';
import Users from "./secure/users/Users";
import Login from "./public/Login";
import Register from "./public/Register";
import NavigateToDashboard from "./secure/NavigateToDashboard";
import UserCreate from "./secure/users/UserCreate";
import UserEdit from "./secure/users/UserEdit";
import Roles from "./secure/roles/Roles";
import RoleCreate from "./secure/roles/RoleCreate";
import RoleEdit from "./secure/roles/RoleEdit";
import Products from "./secure/products/Products";
import ProductCreate from "./secure/products/ProductCreate";
import ProductEdit from "./secure/products/ProductEdit";
import Orders from "./secure/orders/Orders";
import { OrderItem } from "./classes/order_item";
import OrderItems from "./secure/orders/OrderItems";
import Profile from "./secure/profile/Profile";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<NavigateToDashboard/>}/>
          <Route path={'/dashboard'} element={<Dashboard/>}/>
          <Route path={'/users'} element={<Users/>}/>
          <Route path={'/profile'} element={<Profile/>}/>
          <Route path={'/users/create'} element={<UserCreate/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/register'} element={<Register/>}/>
          <Route path={'/users/:id/edit'} element={<UserEdit/>}/>
          <Route path={'/roles'} element={<Roles/>}/>
          <Route path={'/roles/create'} element={<RoleCreate/>}/>
          <Route path={'/roles/:id/edit'} element={<RoleEdit/>}/>
          <Route path={'/products'} element={<Products/>}/>
          <Route path={'/products/create'} element={<ProductCreate/>}/>
          <Route path={'/products/:id/edit'} element={<ProductEdit/>}/>
          <Route path={'/orders'} element={<Orders/>}/>
          <Route path={'/orders/:id'} element={<OrderItems/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
 