import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseAnalytics: builder.query({
      query: (id) => ({
        url: `courses/get-course-analytics/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getUsersAnalytics: builder.query({
        query: (id) => ({
          url: `user/get-users-analytics/${id}`,
          method: "GET",
          credentials: "include" as const,
        }),
      }),

      getOrdersAnalytics: builder.query({
        query: (id) => ({
          url: `order/get-orders-analytics/${id}`,
          method: "GET",
          credentials: "include" as const,
        }),
      }),

      getInstructorCoursesAndUserCount: builder.query({
        query: (id) => ({
          url: `user/get-instructor-courses-and-user-count/${id}`,
          method: "GET",
          credentials: "include" as const,
        }),
      }),
  
      // Fetch overall revenue analytics
      getRevenueAnalytics: builder.query({
        query: (id) => ({
          url: `order/revenue-analytics/${id}`,
          method: "GET",
          credentials: "include" as const,
        }),
      }),
      getInstructorRevenueAnalytics: builder.query({
        query: (id) => ({
          url: `order/instructor-revenue-analytics/${id}`,
          method: "GET",
          credentials: "include" as const,
        }),
      }),
  }),
});

export const { useGetCourseAnalyticsQuery,useGetRevenueAnalyticsQuery,useGetInstructorRevenueAnalyticsQuery, useGetUsersAnalyticsQuery, useGetOrdersAnalyticsQuery,useGetInstructorCoursesAndUserCountQuery } = analyticsApi;