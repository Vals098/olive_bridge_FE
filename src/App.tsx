import { useEffect } from "react"
import { Provider, useDispatch } from "react-redux"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import "./App.css"

import store, { persistor, type AppDispatch } from "./redux/store"
import { getCurrentUser } from "./redux/actions/userAction/getCurrentUser"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import CartPersistence from "./components/CartPersistence"

import Home from "./pages/Home"
import Products from "./pages/Products"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Profile from "./pages/Profile"
import Addresses from "./pages/Addresses"

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
    <>
      <CartPersistence />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/addresses" element={<Addresses />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  )
}
