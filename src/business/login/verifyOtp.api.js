"use server";
import {httpClient} from "@/lib";
import {onboarding} from "@/business";

export async function verifyOtp(phone, otp) {
    const client = await httpClient();
    let response = await client.post("/sc-onboarding/api/customer/verify-otp", {
        msisdn: phone,
        primaryMsisdn: phone,
        otp: otp,
        useCase: "LOGIN",
        method: "sms",
    });

    if (response?.responseCode === '200') {
        await onboarding(phone, otp);
    }else{
        return response
    }
}
