import { apiSlice } from "../api/apiSlice";
import { userLoggedOut } from "../auth/authSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "admin/get-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    getInstructors: builder.query({
      query: () => ({
        url: "admin/get-instructors",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getFAQ:builder.query({
      query:() =>({
        url:"admin/get-faq",
        method:"GET",
        credentials:"include" as const
      })
    }),

    addCategories: builder.mutation({
      query: (categories) => ({
        url: "admin/add-categories",
        method: "POST",
        body: categories,
        credentials: "include" as const,
      })
    }),

    addFAQ:builder.mutation({
      query:(questions) =>({
        url:"admin/add-faq",
        method:"POST",
        body:questions,
        credentials:"include" as const
      })
    }),
    
    getCategories: builder.query({
      query: () => ({
        url: "admin/get-categories",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    verifyInstructor: builder.mutation({
      query: ({id}) => ({
        url: `admin/verify-instructor/${id}`,
        method: "PATCH",
        credentials: "include" as const,
      }),
    }),

    
    getInstructorData: builder.query({
      query: (id) => ({
        url: `admin/get-instructor/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    blockUser: builder.mutation({
      query: ({id}) => ({
        url: `admin/block-user/${id}`,
        method: "PATCH",
        credentials: "include" as const,
      }),
    }),

    unBlockUser: builder.mutation({
      query: ({id}) => ({
        url: `admin/unBlock-user/${id}`,
        method: "PATCH",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetInstructorsQuery,
  useAddCategoriesMutation,
  useAddFAQMutation,
  useGetFAQQuery,
  useGetCategoriesQuery,
  useVerifyInstructorMutation,
  useGetInstructorDataQuery,
  useBlockUserMutation,
  useUnBlockUserMutation
} = adminApi;
