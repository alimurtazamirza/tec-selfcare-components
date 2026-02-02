import ClientWrapper from "./ClientWrapper.js";

/**
 * Server Component - handles data fetching and decryption
 */
export default async function LoginPage({
  searchParams,
  decryptFn,
  MobileVerifyOtp,
  WebVerifyOtp,
  MobileRequestOtp,
  WebRequestOtp,
}) {
  const paramsObj = await searchParams;
  
  let step = null;
  let msisdn = null;

  const encryptedData = paramsObj?.data;
  if (encryptedData && decryptFn) {
    try {
      const decrypted = await decryptFn(decodeURIComponent(encryptedData));
      const params = JSON.parse(decrypted);
      step = params?.step;
      msisdn = params?.msisdn;
    } catch (error) {
      console.error("Failed to decrypt login data:", error);
    }
  }

  return (
    <ClientWrapper
      step={step}
      msisdn={msisdn}
      MobileVerifyOtp={MobileVerifyOtp}
      WebVerifyOtp={WebVerifyOtp}
      MobileRequestOtp={MobileRequestOtp}
      WebRequestOtp={WebRequestOtp}
    />
  );
}