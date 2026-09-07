import { useEffect } from "react"
import { Provider, useDispatch } from "react-redux"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import "./App.css"

import store, { type AppDispatch } from "./redux/store"
import { getCurrentUser } from "./redux/actions/userAction/getCurrentUser"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import AdminRoute from "./components/AdminRoute"

import Home from "./pages/Home"
import Products from "./pages/Products"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProductDetail from "./pages/ProductDetail"

import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Favourites from "./pages/Favourites"
import Addresses from "./pages/Addresses"
import Business from "./pages/Business"
import SampleRequests from "./pages/SampleRequests"
import BusinessInquiries from "./pages/BusinessInquiries"

import AdminDashboard from "./pages/AdminDashboard"
import AdminProducts from "./pages/AdminProducts"
import AdminProductForm from "./pages/AdminProductForm"
import AdminCategoryCreate from "./pages/AdminCategoryCreate"
import AdminTechnicalInformationCreate from "./pages/AdminTechnicalInformationCreate"

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

function AppContent() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* PRIVATE ROUTES */}

          <Route element={<PrivateRoute />}>
            <Route path="/favourites" element={<Favourites />} />

            <Route path="/addresses" element={<Addresses />} />

            <Route path="/business" element={<Business />} />

            <Route path="/sample-requests" element={<SampleRequests />} />

            <Route path="/business-inquiries" element={<BusinessInquiries />} />

            {/* ADMIN ROUTES */}

            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="/admin/products" element={<AdminProducts />} />

              <Route
                path="/admin/products/new"
                element={<AdminProductForm />}
              />

              <Route
                path="/admin/products/edit/:productId"
                element={<AdminProductForm />}
              />

              <Route
                path="/admin/categories/new"
                element={<AdminCategoryCreate />}
              />

              <Route
                path="/admin/technical-information/new"
                element={<AdminTechnicalInformationCreate />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
