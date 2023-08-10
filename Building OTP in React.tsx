import React, { useState, useRef } from "react";

interface OtpFormProps {
  onSubmit: (otp: string) => void;
}

const OtpForm: React.FC<OtpFormProps> = ({ onSubmit }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  const handleOtpChange = (index: number, value: string) => {
    if (value.match(/^\d*$/)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value === "" && index > 0) {
        refs[index - 1].current?.focus(); // Shift focus to the previous input when backspace is pressed
      } else if (index < 5 && value !== "") {
        refs[index + 1].current?.focus(); // Shift focus to the next input when a digit is entered
      }
    }
  };

  const handleOtpSubmit = () => {
    const enteredOtp = otp.join("");
    onSubmit(enteredOtp);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            className="w-12 h-12 text-center border rounded"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            ref={refs[index]}
          />
        ))}
      </div>
      <button
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleOtpSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default OtpForm;
