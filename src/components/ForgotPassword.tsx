"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { styles } from "../styles/style";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
});

const ForgotPassword: React.FC<Props> = ({ setRoute }) => {
  const [forgotPassword, { isLoading, isSuccess, error }] =
    useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    onSubmit: async ({ email }) => {
      try {
        await forgotPassword(email).unwrap();
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset email sent!");
      setRoute("VerifyResetCode");
    } else if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(
          errorData.data.message || "Failed to send password reset email"
        );
      }
    }
  }, [isSuccess, error, setRoute]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title} text-xl`}>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label} `}>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="Enter your email"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          } text-sm`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-1 text-sm block">
            {errors.email}
          </span>
        )}

        <div className="w-full mt-5">
          <button
            type="submit"
            className={`${styles.button} text-white`}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Email"}
          </button>
        </div>
      </form>
      <br />

      <h5 className="text-center pt-4 font-Poppins text-sm text-black dark:text-white">
        Go back to sign in?{" "}
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Sign in
        </span>
      </h5>
    </div>
  );
};

export default ForgotPassword;
