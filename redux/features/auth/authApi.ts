import { apiSlice } from "../api/apiSlice";
import {
  userLoggedIn,
  userLoggedOut,
  userRegistration,
  setResetPassword,
  successResetPassword,
} from "./authSlice";
import { signOut, useSession } from "next-auth/react";

type RegistrationResponse = {
  message: string;
  data: {
    token: string;
  };
};

type ForgotPasswordResponse = {
  message: string;
  data: {
    resetToken: string;
    userId: string;
    email: string;
  };
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "user/register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(
            userRegistration({
              token: result.data.data.token,
            })
          );
        } catch (e: any) {
          console.log(e?.error?.data);
        }
      },
    }),

    activation: builder.mutation({
      query: ({ token, activationCode }) => ({
        url: "user/activate",
        method: "POST",
        body: {
          token,
          activationCode,
        },
      }),
    }),

    forgotPassword: builder.mutation<ForgotPasswordResponse, string>({
      query: (email) => ({
        url: "user/forgot-password",
        method: "POST",
        body: { email },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("Forgot Password Result:", result);
          dispatch(
            setResetPassword({
              resetToken: result.data.data.resetToken,
              email: result.data.data.email,
              userId: result.data.data.userId,
            })
          );
        } catch (e: any) {
          console.log(e?.error?.data);
        }
      },
    }),

    verifyResetCode: builder.mutation({
      query: ({ token, resetCode }) => ({
        url: "user/verify-reset-code",
        method: "POST",
        body: {
          token,
          resetCode,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result.data.message);
        } catch (e: any) {
          console.log(e?.error?.data);
        }
      },
    }),

    resetPassword: builder.mutation({
      query: ({ userId, newPassword }) => ({
        url: "user/reset-password",
        method: "POST",
        body: {
          newPassword,
          userId,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result.data.message);
          dispatch(successResetPassword());
        } catch (e: any) {
          console.log(e?.error?.data);
        }
      },
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "user/login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (e: any) {
          console.log(e.error.data);
        }
      },
    }),

    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "user/social-auth",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (e: any) {
          await signOut();
          dispatch(userLoggedOut());
          console.log(e?.error?.data);
        }
      },
    }),

    logOut: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (e: any) {
          console.log(e?.error?.data);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogOutMutation,
  useForgotPasswordMutation,
  useVerifyResetCodeMutation,
  useResetPasswordMutation,
} = authApi;
