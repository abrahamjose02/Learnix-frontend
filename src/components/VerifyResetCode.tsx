import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import {
  useVerifyResetCodeMutation,
  useForgotPasswordMutation,
} from "../../redux/features/auth/authApi";
import OtpField from "./OtpField";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { styles } from "../styles/style";

type Props = {
  setRoute: (route: string) => void;
};

const VerifyResetCode: React.FC<Props> = ({ setRoute }) => {
  const [verifyResetCode, { isLoading, isSuccess, error }] =
    useVerifyResetCodeMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const { resetToken, email } = useSelector((state: any) => state.auth);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [verifyNumber, setVerifyNumber] = useState("");
  const [invalidError, setInvalidError] = useState(false);
  

  useEffect(() => {
    if (isSuccess) {
      toast.success("Reset code verified successfully");
      setRoute("ResetPassword");
    } else if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message || "Verification failed");
      }
      setInvalidError(true);
    }
  }, [isSuccess, error, setRoute]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const handleVerify = async () => {
    if (verifyNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await verifyResetCode({ token: resetToken, resetCode: verifyNumber });
  };

  const OtpHandler = (otp: string) => {
    if (otp.length === 4) {
      setVerifyNumber(otp);
    } else {
      setVerifyNumber("");
      setInvalidError(false);
    }
  };

  const resendOTP = async () => {
    try {
      await forgotPassword(email).unwrap();
      toast.success("Reset code resent successfully");
      setSecondsRemaining(60);
    } catch (err) {
      toast.error("Failed to resend reset code. Please try again later.");
      console.error("Error resending reset code:", err);
    }
  };

  return (
    <div className="px-12">
      <h1 className={`${styles.title} text-xl`}>Verify Reset Code</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[50px] h-[30px] bg-slate-500 flex items-center justify-center">
          <VscWorkspaceTrusted size={200} />
        </div>
      </div>
      <br />
      <br />
      <div className="m-auto flex items-center justify-around pb-4">
        <OtpField
          numDigits={4}
          onChange={OtpHandler}
          invalidError={invalidError}
        />
      </div>
      <span className="flex justify-between m-0">
        <span className="text-xs">This OTP will expire in 60 Seconds.</span>
        <button
          type="button"
          disabled={secondsRemaining !== 0}
          className={`text-xs ${
            secondsRemaining !== 0
              ? "text-gray-400"
              : "text-blue-500 cursor-pointer"
          }`}
          onClick={resendOTP}
        >
          {secondsRemaining > 0 && secondsRemaining}&nbsp;Resend OTP
        </button>
      </span>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button
          className={`${styles.button} text-white font-thin`}
          onClick={handleVerify}
          disabled={isLoading}
        >
          Verify Reset Code
        </button>
      </div>
      
    </div>
  );
};

export default VerifyResetCode;
