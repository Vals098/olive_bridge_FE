import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "./storage"

import userReducer from "../reducers/userReducer"
import productReducer from "../reducers/productReducer"
import cartReducer from "../reducers/cartReducer"
import productVariantReducer from "../reducers/productVariantReducer"
import addressReducer from "../reducers/addressReducer"

const cartPersistConfig = {
  key: "cart",
  storage,
}

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer)

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    productVariant: productVariantReducer,
    cart: persistedCartReducer,
    address: addressReducer,
  },
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
