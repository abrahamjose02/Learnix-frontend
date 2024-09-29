import React, { useState } from "react";
import OTPInput from "react-otp-input";

interface OtpFieldProps {
  numDigits: number;
  onChange: (otp: string) => void;
  invalidError: boolean;
}

const OtpField: React.FC<OtpFieldProps> = ({
  numDigits,
  onChange,
  invalidError,
}) => {
  const [otp, setOtp] = useState("");

  const handleChange = (otp: string) => {
    setOtp(otp);
    onChange(otp);
  };

  return (
    <OTPInput
      value={otp}
      onChange={handleChange}
      numInputs={numDigits}
      renderSeparator={<span>-</span>}
      shouldAutoFocus={true}
      inputStyle={{
        width: "3.4rem",
        marginRight: "1rem",
      }}
      renderInput={(props) => (
        <input
          {...props}
          type="number"
          className={`w-[55pxpx] h-[55px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[16px] font-Poppins outline-none text-center ${
            invalidError
              ? "shake border-red-500"
              : "dark:border-white border-[#0000004a]"
          }`}
        />
      )}
    />
  );
};

export default OtpField;
