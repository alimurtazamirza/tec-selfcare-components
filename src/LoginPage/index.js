import { Box } from "@mui/material";

/**
 * Reusable Login Page Component
 * 
 * @param {Object} props
 * @param {Object} props.searchParams - Next.js search params (promise in Next.js 15+)
 * @param {React.ComponentType} props.MobileVerifyOtp - Mobile verify OTP component
 * @param {React.ComponentType} props.WebVerifyOtp - Web verify OTP component
 * @param {React.ComponentType} props.MobileRequestOtp - Mobile request OTP component
 * @param {React.ComponentType} props.WebRequestOtp - Web request OTP component
 * @param {Function} props.decryptFn - Async function to decrypt encrypted data
 */
export default async function LoginPage({
  searchParams,
  MobileVerifyOtp,
  WebVerifyOtp,
  MobileRequestOtp,
  WebRequestOtp,
  decryptFn,
}) {
  const paramsObj = await searchParams;

  const encryptedData = paramsObj?.data;
  if (encryptedData && decryptFn) {
    try {
      const decrypted = await decryptFn(decodeURIComponent(encryptedData));
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