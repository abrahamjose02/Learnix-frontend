import { styles } from "@/styles/style";
import React, { useEffect, useState } from "react";
import {
  useUpdateAvatarMutation,
  useUpdatePasswordMutation,
} from "../../../redux/features/user/userApi";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])/;
const passwordNumberRule = /(?=.*[0-9])/;

const passwordValidation = Yup.string()
  .min(8)
  .matches(passwordRules, {
    message: "Requires a combination of uppercase and lowercase letters.",
  })
  .matches(passwordNumberRule, { message: "At least one number (0-9)." })
  .required("Please enter your password");

const schema = Yup.object().shape({
  oldPassword: passwordValidation,
  newPassword: passwordValidation.notOneOf(
    [Yup.ref("oldPassword")],
    "New password must be different from the old password"
  ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

type Props = {};

const ChangePassword = (props: Props) => {
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password update successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: async ({ newPassword, oldPassword }, { resetForm }) => {
      await updatePassword({ oldPassword, newPassword });
      resetForm();
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
      <h1 className="block text-[16px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="block text-black dark:text-[#fff]">
              Old Password
            </label>
            <input
              type="password"
              className={`${styles.input}${
                errors.oldPassword && touched.oldPassword && "border-red-500"
              } !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              name="oldPassword"
              value={values.oldPassword}
              onChange={handleChange}
            />
            {errors.oldPassword && touched.oldPassword && (
              <span className="text-red-500 pt-1 text-sm block">
                {errors.oldPassword}
              </span>
            )}
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-2">
            <label className="block text-black dark:text-[#fff]">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              className={`${styles.input}${
                errors.newPassword && touched.newPassword && "border-red-500"
              } !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={values.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && touched.newPassword && (
              <span className="text-red-500 pt-1 text-sm block">
                {errors.newPassword}
              </span>
            )}
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-2">
            <label className="block text-black dark:text-[#fff]">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`${styles.input}${
                errors.confirmPassword &&
                touched.confirmPassword &&
                "border-red-500"
              } !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={values.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <span className="text-red-500 pt-1 text-sm block">
                {errors.confirmPassword}
              </span>
            )}
            <input
              type="submit"
              className={`w-[95%] h-[40px] border border-[#37a39a] text-center rounded-[3px] mt-8 cursor-pointer text-black dark:text-[#fff]`}
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;