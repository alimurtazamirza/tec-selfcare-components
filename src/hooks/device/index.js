import {setDeviceId} from "../../business/device/setDeviceId";

export async function getDeviceId() {
    const res = await fetch("/__device_id__");
    const {deviceId} = await res.json();
    console.log('get is calling')
    await setDeviceId(deviceId)
    return deviceId;
}
