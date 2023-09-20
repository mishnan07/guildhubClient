// store.js

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import ClientAuth from "./ClientAuth";
import proAuth from "./proAuth";
import AdminAuth from "./AdminAuth";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Note: Import storage directly

const userPersistConfig = { key: 'Client', storage };
const userPersistReducer = persistReducer(userPersistConfig, ClientAuth);

const proPersistConfig = { key: 'pro', storage };
const proPersistReducer = persistReducer(proPersistConfig, proAuth);

const adminPersistConfig = { key: 'admin', storage };
const adminPersistReducer = persistReducer(adminPersistConfig, AdminAuth);

const store = configureStore({
  reducer: {
    ClientAuth: userPersistReducer,
    proAuth: proPersistReducer,
    AdminAuth: adminPersistReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);

export { store, persistor }; // Export store and persistor as named exports
