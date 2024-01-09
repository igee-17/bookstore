import React, { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";

const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const appVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
      },
    });

    // Assign the RecaptchaVerifier object to window
    window.recaptchaVerifier = appVerifier;
  }, []);

  const handleSendCode = async () => {
    setIsSubmitting(true);
    try {
      const auth = getAuth();
      const appVerifier = window.recaptchaVerifier;

      if (!appVerifier) {
        console.error(
          "RecaptchaVerifier is not defined. Make sure to set it up correctly."
        );
        return;
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setIsSubmitting(false);
      setConfirmationResult(confirmation);
      toast.success("OTP sent");
    } catch (error) {
      console.error("Error sending verification code:", error);
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async () => {
    setIsSubmitting(true);
    try {
      await confirmationResult.confirm(verificationCode);
      // User signed in successfully, handle accordingly
      console.log("verification success");
      toast.success("Verification success");
      // return redirect("/login");
      setIsSubmitting(false);
      localStorage.setItem("isAuth", "true");
      navigate("/login");
    } catch (error) {
      console.error("Error verifying code:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen grid place-items-center">
      <form className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold">Phone Verification</h4>
        <div className="form-control">
          <label htmlFor="phoneNumber" className="label">
            <span className="label-text capitalize">Phone number</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            defaultValue=""
            className={`input input-bordered `}
            placeholder="+2348030003300"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="btn btn-primary btn-block"
            disabled={isSubmitting || confirmationResult}
            onClick={handleSendCode}
            id="sign-in-button"
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                sending...
              </>
            ) : (
              "send otp"
            )}
          </button>
        </div>
        <div className="form-control">
          <label htmlFor="One Time Password (OTP)" className="label">
            <span className="label-text capitalize">
              One Time Password (OTP)
            </span>
          </label>
          <input
            type="text"
            name="One Time Password (OTP)"
            className={`input input-bordered `}
            placeholder="123123"
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="btn btn-primary btn-block"
            disabled={isSubmitting || !confirmationResult}
            onClick={handleVerifyCode}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                verifying...
              </>
            ) : (
              "verify otp"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhoneVerification;
