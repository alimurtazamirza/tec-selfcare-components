import { Box } from "@mui/material";
import {decrypt} from "../../lib";

/**
 * Reusable Login Page Component
 * 
 * @param {Object} props
 * @param {Object} props.searchParams - Next.js search params (promise in Next.js 15+)
 * @param {React.ComponentType} props.MobileVerifyOtp - Mobile verify OTP component
 * @param {React.ComponentType} props.WebVerifyOtp - Web verify OTP component
 * @param {React.ComponentType} props.MobileRequestOtp - Mobile request OTP component
 * @param {React.ComponentType} props.WebRequestOtp - Web request OTP component
 */
export default async function LoginPage({
  searchParams,
  MobileVerifyOtp,
  WebVerifyOtp,
  MobileRequestOtp,
  WebRequestOtp,
}) {
  const paramsObj = await searchParams;

  const encryptedData = paramsObj?.data;
  if (encryptedData && decrypt) {
    try {
      const decrypted = await decrypt(decodeURIComponent(encryptedData));
      const params = JSON.parse(decrypted);
      
      if (params?.step === "verify" && params?.msisdn) {
        return (
          <>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <MobileVerifyOtp msisdn={params.msisdn} />
            </Box>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <WebVerifyOtp msisdn={params.msisdn} />
            </Box>
          </>
        );
      }
    } catch (error) {
      console.error("Failed to decrypt login data:", error);
      // Fall through to default RequestOtp view
    }
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