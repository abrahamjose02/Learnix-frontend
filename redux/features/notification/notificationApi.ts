import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: (id) => ({
        url: `courses/get-all-notification/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateNotification: builder.mutation({
      query: (id) => ({
        url: `courses/update-notification/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllNotificationQuery, useUpdateNotificationMutation } = notificationApi;