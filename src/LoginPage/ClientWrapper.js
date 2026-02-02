"use client";

import { Box } from "@mui/material";

export default function LoginPageClient({
  step,
  msisdn,
  MobileVerifyOtp,
  WebVerifyOtp,
  MobileRequestOtp,
  WebRequestOtp,
}) {
  if (step === "verify" && msisdn) {
    return (
      <>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <MobileVerifyOtp msisdn={msisdn} />
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <WebVerifyOtp msisdn={msisdn} />
        </Box>
      </>
    );
  }

  return (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <MobileRequestOtp />
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <WebRequestOtp />
      </Box>
    </>
  );
}