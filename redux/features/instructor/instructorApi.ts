import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "../auth/authSlice";

export const instructorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    instructorRegister: builder.mutation({
      query: (formData) => ({
        url: "instructor/register",
        method: "POST",
        body: formData,
        credentials: "include" as const,
      }),
    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled;
    //       dispatch(
    //         userLoggedIn({
    //           accessToken: result.data.accessToken,
    //           user: result.data.user,
    //         })
    //       );
    //     } catch (e: any) {
    //       console.log(e?.error?.data);
    //     }
    //   },
    }),
  }),
});

export const { useInstructorRegisterMutation } = instructorApi;
