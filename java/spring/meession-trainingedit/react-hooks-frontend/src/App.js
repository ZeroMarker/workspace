import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import ListEmployeeComponent from './components/Employee/ListEmployeeComponent'
import ListProductComponent from './components/Product/ListProductComponent'
import ListCustomerComponent from './components/Customer/ListCustomerComponent'
import ListAuthorityComponent from './components/Authority/ListAuthorityComponent'
import ListOrderComponent from './components/Order/ListOrderComponent'
import LoginPage from './components/Login/LoginPage'
import NotFound from './components/Error/NotFound'
import ListMyHome from './components/MyHome/ListMyHome'
import ListHomePage from './components/HomePage/ListHomePage'
import SignupPage from './components/Signup/SignupPage'
export default function App() {

    return (
        <div>
            <Router>
                
                

                    <Routes>                    
                        <Route path="/" element={<LoginPage/>}></Route>
                        <Route path="/employees" element={<ListEmployeeComponent/>}></Route>
                        <Route path="/products" element={<ListProductComponent/>}></Route>
                        <Route path="/customers" element={<ListCustomerComponent/>}></Route>
                        <Route path="/authoritys" element={<ListAuthorityComponent/>}></Route>
                        <Route path="/orders" element={<ListOrderComponent/>}></Route>
                        <Route path="/signup" element={<SignupPage/>}></Route>
                        <Route path="/myhome" element={<ListMyHome/>}></Route>
                        <Route path="/homepage" element={<ListHomePage/>}></Route>
                        <Route path="/*" element={<NotFound/>}></Route>
                    </Routes>

                
                
            </Router>
        </div>
    )
} 
