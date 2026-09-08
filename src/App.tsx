import { useEffect } from "react"
import { Provider, useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import "./App.css"

import store, {
  persistor,
  type AppDispatch,
  type RootState,
} from "./redux/store"
import { getCurrentUser } from "./redux/actions/userAction/getCurrentUser"
import { getFavourites } from "./redux/actions/favouriteAction/getFavourites"

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
import Favourites from "./pages/Favourites"
import Business from "./pages/Business"
import SampleRequests from "./pages/SampleRequests"
import BusinessInquiries from "./pages/BusinessInquiries"
import AdminRoute from "./components/AdminRoute"
import AdminDashboard from "./pages/AdminDashboard"
import AdminOrders from "./pages/AdminOrders"
import AdminSampleRequests from "./pages/AdminSampleRequests"
import AdminBusinessInquiries from "./pages/AdminBusinessInquiries"
import AdminProducts from "./pages/AdminProducts"
import AdminCategoryCreate from "./pages/AdminCategoryCreate"
import AdminTechnicalInformationCreate from "./pages/AdminTechnicalInformationCreate"
import AdminProductForm from "./pages/AdminProductForm"
import Notifications from "./pages/Notifications"

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

  const currentUser = useSelector((state: RootState) => state.user.currentUser)

  useEffect(() => {
    if (currentUser) {
      dispatch(getFavourites())
    }
  }, [currentUser, dispatch])

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
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/business" element={<Business />} />
              <Route path="/sample-requests" element={<SampleRequests />} />
              <Route
                path="/business-inquiries"
                element={<BusinessInquiries />}
              />
              <Route path="/notifications" element={<Notifications />} />

              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />

                <Route path="/admin/orders" element={<AdminOrders />} />

                <Route path="/admin/products" element={<AdminProducts />} />

                <Route
                  path="/admin/sample-requests"
                  element={<AdminSampleRequests />}
                />

                <Route
                  path="/admin/business-inquiries"
                  element={<AdminBusinessInquiries />}
                />

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
