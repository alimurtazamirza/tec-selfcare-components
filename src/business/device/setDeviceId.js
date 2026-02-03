'use server';

import {getSessionServer, setSessionServer} from "@/lib";

export async function setDeviceId(deviceId) {
    const existing = await getSessionServer("deviceId");
    if (existing === null) {
        await setSessionServer({deviceId});
    }
}
