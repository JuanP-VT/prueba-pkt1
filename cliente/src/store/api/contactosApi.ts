import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
/**
 * RTK Query para conseguir los contactos
 */
const baseQuery = fetchBaseQuery({
  baseUrl: "https://pkt1-prueba-api.fly.dev",
  prepareHeaders: (headers) => {
    const jwt = JSON.parse(localStorage.getItem("pkt1-jwt") || "{}");

    if (jwt) {
      headers.set("Authorization", `Bearer ${jwt.token}`);
    }

    return headers;
  },
});
export const contactosApi = createApi({
  reducerPath: "contactosApi",
  baseQuery,
  endpoints: (builder) => ({
    getAgenda: builder.query({
      query: () => "/agenda",
    }),
  }),
});

export const { useGetAgendaQuery } = contactosApi;
