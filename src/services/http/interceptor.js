"use server";
import packageInfo from "../../../package.json";
import {getSessionServer, clearSessionServer} from "@";

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
    if (session.access_token) {
        defaultHeaders["X-Auth-SelfCare-Key"] = session.access_token;
        defaultHeaders["msisdn"] = session.msisdn || "";
    }

    const finalHeaders = {
        ...defaultHeaders,
        ...(options.headers || {})
    };

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
        return {error: true, message: error.message};
    }
}