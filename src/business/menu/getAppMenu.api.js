"use server";
import { httpClient, setSessionServer, clearSessionServer } from "@/lib";
import { redirect } from "next/navigation";

export async function getAppMenu() {

    const client = await httpClient();
    const { responseCode, data } = await client.post("content-service/api/menu/get-app-menu", {});
    if (responseCode === "200") {
        setSessionServer({ menu: data?.menu });
        const firstAllowed = data?.menu?.[0]?.items?.length > 0 ? data?.menu?.[0]?.items?.[0] : data?.menu?.[0];
        let targetRoute = firstAllowed.identifier || "/";
        if (!targetRoute.startsWith("/")) targetRoute = `/${targetRoute}`;
        redirect(targetRoute);
    } else {
        clearSessionServer();
    }
}