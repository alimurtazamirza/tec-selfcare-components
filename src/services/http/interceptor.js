"use server";
import packageInfo from "../../../package.json";
import { getSessionServer, clearSessionServer } from "@/lib";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function serverFetch(url, options = {}) {
    const session = await getSessionServer() || {};
    const defaultHeaders = {
        "Content-Type": "application/json",
        "Language": session?.language || "en",
        "channel": "sc_web",
        "platform": "web",
        "device-id": session?.uuid || "123",
        "tenant": session?.tenant || "tec-ens",
        "version": packageInfo?.version,
        "transaction-token": "abc"
    };

    // ---- Token if exists ---- //
    if (session.token) {
        defaultHeaders["X-Auth-SelfCare-Key"] = session?.token;
        defaultHeaders["msisdn"] = session?.msisdn;
        defaultHeaders["primary-msisdn"] = session?.primaryMsisdn;
        defaultHeaders["primary-offer-name"] = session?.primaryOfferName;
        defaultHeaders["primary-offer-id"] = session?.primaryOfferId;
        defaultHeaders["subscriber-type"] = session?.subscriberType;
        defaultHeaders["price-plan"] = session?.primaryOfferName;
        defaultHeaders["user-id"] = "1";
    }

    const finalHeaders = {
        ...defaultHeaders,
        ...(options.headers || {})
    };
    console.log("----------------------------------");
    console.log('headers: ', finalHeaders);
    console.log('url: ', BASE_URL + url);
    console.log("----------------------------------");
    

    try {
        const response = await fetch(url.startsWith("http") ? url : BASE_URL + url, {
            ...options,
            headers: finalHeaders
        });

        const data = await response.json().catch(() => null);

        // ---- Interceptor: 401 ---- //
        if (data?.responseCode === "401") {
            await clearSessionServer();
        }

        return data;

    } catch (error) {
        console.error("SERVER FETCH ERROR:", error);
        return { error: true, message: error.message };
    }
}