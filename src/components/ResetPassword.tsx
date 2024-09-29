import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { styles } from "../styles/style";

type Props = {
  setRoute: (route: string) => void;
};

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])/;
const passwordNumberRule = /(?=.*[0-9])/;

const schema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(passwordRules, {
      message: "Requires a combination of uppercase and lowercase letters.",
    })
    .matches(passwordNumberRule, { message: "At least one number (0-9)." })
    .required("Please enter your new password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

const ResetPassword: React.FC<Props> = ({ setRoute }) => {
  const [resetPassword, { isLoading, isSuccess, error }] =
    useResetPasswordMutation();
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const userId = useSelector((state: any) => state.auth.userId);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset successful");
      setRoute("Login");
    } else if (error) {
      if ("data" in error) {
        const errorData = error as any;
        setErrMsg(errorData.data.message || "Password reset failed");
      }
    }
  }, [isSuccess, error, setRoute]);

  const formik = useFormik({
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: async ({ newPassword }) => {
      try {
        if (!userId) {
          setErrMsg("User ID is missing. Please try again.");
          return;
        }
        await resetPassword({ userId, newPassword }).unwrap();
      } catch (err) {
        console.error(err);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title} text-xl`}>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label} mt-5`}>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          placeholder="Enter your new password"
          className={`${
            errors.newPassword && touched.newPassword && "border-red-500"
          } ${styles.input} text-sm`}
        />
        {errors.newPassword && touched.newPassword && (
          <span className="text-red-500 pt-1 text-sm block">
            {errors.newPassword}
          </span>
        )}

        <label className={`${styles.label} mt-5`}>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your new password"
          className={`${
            errors.confirmPassword &&
            touched.confirmPassword &&
            "border-red-500"
          } ${styles.input} text-sm`}
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <span className="text-red-500 pt-1 text-sm block">
            {errors.confirmPassword}
          </span>
        )}

        {errMsg && <p className="text-red-500 pt-2 text-sm">{errMsg}</p>}

        <div className="w-full mt-5">
          <input
            type="submit"
            value="Reset Password"
            className={`${styles.button} text-white`}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
