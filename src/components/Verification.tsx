import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { styles } from "../styles/style";
import { useSelector } from "react-redux";
import {
  useActivationMutation,
  useRegisterMutation,
} from "../../redux/features/auth/authApi";
import OtpField from "./OtpField";

type Props = {
  setRoute: (route: string) => void;
};

const Verification: React.FC<Props> = ({ setRoute }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const { token, email, password, name } = useSelector(
    (state: any) => state.auth
  );
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [register, { data, error: resendError, isSuccess: resendSuccess }] =
    useRegisterMutation();
  const [invalidError, setInvalidError] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      } else {
        console.log("An error occured");
      }
      setInvalidError(true);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (resendSuccess) {
      toast.success("OTP resent successfully");
    }
    if (resendError) {
      toast.error("Failed to resend OTP. Please try again later.");
    }
  }, [resendSuccess, resendError]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const [verifyNumber, setVerifyNumber] = useState("");

  const VerificationHandler = async () => {
    if (verifyNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      token: token,
      activationCode: verifyNumber,
    });
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
      await register({ name, email, password });
      setSecondsRemaining(60);
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  return (
    <div className="px-12">
      <h1 className={`${styles.title} text-xl`}>Verify Your Account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2 ">
        <div className="w-[50px] h-[30px]  bg-slate-500 flex items-center justify-center">
          <VscWorkspaceTrusted size={200} />
        </div>
      </div>
      <br />
      <br />
      <div className=" m-auto flex items-center justify-around pb-4 ">
        <OtpField
          numDigits={4}
          onChange={OtpHandler}
          invalidError={invalidError}
        />
      </div>
      <span className="flex justify-between  m-0">
        <span className="text-xs">This OTP will expire in 5 minutes</span>
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
          onClick={VerificationHandler}
        >
          Verify OTP
        </button>
      </div>
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

export default Verification;
