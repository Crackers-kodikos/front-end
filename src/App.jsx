import React from 'react'
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Orders from './pages/Orders.jsx'
import Tailors from './pages/Tailors.jsx'
import MyBoutiques from './pages/MyBoutiques.jsx'
import BoutiqueDetail from './pages/BoutiqueDetail.jsx'
import BoutiqueForm from './pages/BoutiqueForm.jsx'
import BoutiqueSuccess from './pages/BoutiqueSuccess.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import Notifications from './pages/tailor side /Notifications.jsx'
import OrderCreate from './pages/tailor side /OrderCreate.jsx'
import TailorDetail from './pages/TailorDetail.jsx'
import TailorForm from './pages/TailorForm.jsx'
import Products from './pages/Products.jsx'
import OrderDetail from './pages/OrderDetail.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import ProductForm from './pages/ProductForm.jsx'
import PageTransition from './component/PageTransition.jsx'
import Dashboard from './pages/Dashboaerd.jsx'
import ErrorPage from './pages/eroor.jsx'
import Navbar from './component/Navbar.jsx'


function App() {
  const location = useLocation();
  const hideNavbar = location.pathname !== '/' && location.pathname !== '/about' ;

  return (
    <>
      {!hideNavbar && <Navbar /> }
      <main>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/tailors" element={<Tailors />} />
          <Route path="/tailors/:id" element={<TailorDetail />} />
          <Route path="/tailors/new" element={<TailorForm />} />
          <Route path="/boutiques" element={<MyBoutiques />} />
          <Route path="/boutiques/new" element={<BoutiqueForm />} />
          <Route path="/boutiques/success" element={<BoutiqueSuccess />} />
          <Route path="/boutiques/:id" element={<BoutiqueDetail />} />
          <Route path="/boutiques/:id/edit" element={<BoutiqueForm />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/:id/edit" element={<ProductForm />} />
          <Route path="/orders/new" element={<OrderDetail />} />
          <Route path="/tailor/orders/new" element={<OrderCreate />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
     
        </Routes>
      </main>
    </>
  )
}

export default App