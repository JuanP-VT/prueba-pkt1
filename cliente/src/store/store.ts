/**
 * Configuración del estado global de Redux
 */
import { configureStore } from "@reduxjs/toolkit";
import { contactosApi } from "./api/contactosApi";
export default configureStore({
  reducer: {
    [contactosApi.reducerPath]: contactosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(contactosApi.middleware);
  },
});
