import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import FooterComponent from './layouts/FooterComponent'
import HeaderComponent from './layouts/HeaderComponent'
import ListEmployeeComponent from './components/Employee/ListEmployeeComponent'
import ListProductComponent from './components/Product/ListProductComponent'
import ListCustomerComponent from './components/Customer/ListCustomerComponent'




export default function App() {

    return (
        <div>
            <Router>
                <HeaderComponent />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<ListProductComponent/>}></Route>
                        <Route path="/employees" element={<ListEmployeeComponent/>}></Route>
                        <Route path="/products" element={<ListProductComponent/>}></Route>
                        <Route path="/customers" element={<ListCustomerComponent/>}></Route>
                    </Routes>
                </div>
                
                <FooterComponent />
            </Router>
        </div>
    )
} 
