"use client";

import { useRef, useState, useEffect } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { requestOtp, verifyOtp } from "../../business/index.js";
import { decrypt } from "../../lib/index.js";
import { useSearchParams } from "next/navigation";

/**
 * Mobile Verify OTP Page Component
 * * @typedef {Object} PageStyles
 * @property {import("@mui/material").SxProps} [container] - Style the main container
 * @property {import("@mui/material").SxProps} [title] - Style the page title
 * @property {import("@mui/material").SxProps} [description] - Style the description text
 * @property {import("@mui/material").SxProps} [otpContainer] - Style the Stack holding inputs
 * @property {import("@mui/material").SxProps} [otpInput] - Style the individual OTP input fields
 * @property {import("@mui/material").SxProps} [submitButton] - Style the Verify button
 * @property {import("@mui/material").SxProps} [resendButton] - Style the Resend button
 * * @param {Object} props
 * @param {PageStyles} [props.styles] - Custom styling object
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {string} [props.buttonText]
 * @param {string} [props.resendButtonText]
 * @param {number} [props.otpLength]
 */
export default function MobileVerifyOtp({
  title = "Verify OTP",
  description = "Please enter the 4-digit code sent to your mobile number",
  buttonText = "Verify OTP",
  resendButtonText = "Resend OTP",
  otpLength = 4,
  styles = {}
}) {
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [msisdn, setMsisdn] = useState(null);
  const inputsRef = useRef([]);

  useEffect(() => {
    const encryptedData = searchParams.get("data");
    if (!encryptedData) return;

    (async () => {
      try {
        const decrypted = await decrypt(decodeURIComponent(encryptedData));
        const params = JSON.parse(decrypted);
        setMsisdn(params.msisdn || null);
      } catch (err) {
        console.error("Decrypt failed:", err);
      }
    })();
  }, [searchParams]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);

    if (value && index < otpLength - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const nextOtp = [...otp];
      nextOtp[index - 1] = "";
      setOtp(nextOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const submitOtp = async () => {
    const code = otp.join("");
    if (code.length !== otpLength || !msisdn) return;

    try {
      await verifyOtp(msisdn, code);
      console.log("OTP verified:", code, "for", msisdn);
    } catch (err) {
      console.error("OTP verification failed:", err);
    }
  };

  const resendOtp = async () => {
    if (!msisdn) return;
    try {
      await requestOtp(msisdn);
      console.log("OTP resent to", msisdn);
    } catch (err) {
      console.error("Failed to resend OTP:", err);
    }
  };

  return (
    <Box sx={[{ p: 3 }, styles.container]}>
      <Typography 
        variant="h4" 
        sx={[{ fontWeight: 700 }, styles.title]}
      >
        {title}
      </Typography>

      <Typography 
        color="text.secondary" 
        sx={[{ mt: 1 }, styles.description]}
      >
        {description}
      </Typography>

      <Stack 
        direction="row" 
        spacing={2} 
        sx={[{ mt: 3, justifyContent: "center" }, styles.otpContainer]}
      >
        {otp.map((digit, index) => (
          <TextField
            key={index}
            value={digit}
            inputRef={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            sx={[{ width: 56 }, styles.otpInput]}
            inputProps={{
              maxLength: 1,
              inputMode: "numeric",
              pattern: "[0-9]*",
              style: {
                textAlign: "center",
                fontSize: 24,
                fontWeight: 600,
              },
            }}
          />
        ))}
      </Stack>

      <Button
        variant="contained"
        fullWidth
        disabled={otp.join("").length !== otpLength || !msisdn}
        onClick={submitOtp}
        sx={[{ mt: 4 }, styles.submitButton]}
      >
        {buttonText}
      </Button>

      <Button
        variant="text"
        onClick={resendOtp}
        disabled={!msisdn}
        fullWidth
        sx={[{ mt: 1 }, styles.resendButton]}
      >
        {resendButtonText}
      </Button>
    </Box>
  );
}