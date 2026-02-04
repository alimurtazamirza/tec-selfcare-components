"use server";

import {serverFetch} from "../../services";

export async function httpClient() {
    const get = async (endpoint, params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await serverFetch(`${endpoint}${queryString ? `?${queryString}` : ""}`, {
            method: "GET"
        });
    };

    const
        post = async (endpoint, body = {}, params = {}) => {
            const queryString = new URLSearchParams(params).toString();
            return await serverFetch(`${endpoint}${queryString ? `?${queryString}` : ""}`, {
                method: "POST",
                body: JSON.stringify(body)
            });
        };

    const put =
        async (endpoint, body = {}, params = {}) => {
            const queryString = new URLSearchParams(params).toString();
            return await serverFetch(`${endpoint}${queryString ? `?${queryString}` : ""}`, {
                method: "PUT",
                body: JSON.stringify(body)
            });
        };

    // const delete =
    //     async (endpoint, params = {}) => {
    //         const queryString = new URLSearchParams(params).toString();
    //         return await serverFetch(`${endpoint}${queryString ? `?${queryString}` : ""}`, {
    //             method: "DELETE"
    //         });
    //     }
    return {get, post, put}
}
