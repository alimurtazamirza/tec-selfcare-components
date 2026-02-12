"use server";
import { httpClient, encrypt, getSessionServer } from "@/lib";
import { redirect } from "next/navigation";

export async function requestOtp(phone) {
    const client = await httpClient();
    let response = await client.post("/sc-onboarding/api/customer/generate-otp", {
        msisdn: phone,
        primaryMsisdn: phone,
        useCase: "LOGIN",
        method: "sms",
    });
    if (response?.responseCode === '200') {
        const params = {
            step: "verify",
            msisdn: phone
        };
        const encryptedParams = await encrypt(JSON.stringify(params));
        redirect(`/login?data=${encodeURIComponent(encryptedParams)}`);
    } else {
        return response
    }
}
