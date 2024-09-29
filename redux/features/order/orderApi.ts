import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (type) => ({
        url: "order/get-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getStripeKey: builder.query({
      query: () => ({
        url: "order/stripe-publishkey",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: "order/payment",
        method: "POST",
        body: { amount },
        credentials: "include" as const,
      }),
    }),

    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: "order/create-order",
        body: {
          courseId,
          payment_info,
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useGetStripeKeyQuery,
  useCreatePaymentIntentMutation,
}=ordersApi;
