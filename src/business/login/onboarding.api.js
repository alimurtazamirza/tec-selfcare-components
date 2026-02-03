"use server";
import {httpClient, setSessionServer} from "@/lib";
import {redirect} from "next/navigation";

export async function onboarding(phone, otp) {
    const client = await httpClient();
    const {responseCode, data} = await client.post("/sc-onboarding/api/customer/onboarding", {
        msisdn: phone,
        primaryMsisdn: phone,
        useCase: "LOGIN",
        otp,
    });
    if (responseCode === "200") {
        await setSessionServer({...data, loginTime: Date.now()});
        redirect("/dashboard");
    }

    return {responseCode, data};
}
