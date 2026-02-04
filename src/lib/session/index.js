"use server";

import crypto from "crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const RAW_SECRET = process.env.SESSION_SECRET || "myverystrongsecretkeythatis32chars!";
const SECRET_KEY = crypto.createHash("sha256").update(RAW_SECRET).digest();

export async function encrypt(data) {
    try {
        const text = JSON.stringify(data);
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
        let encrypted = cipher.update(text, "utf8", "hex");
        encrypted += cipher.final("hex");
        const authTag = cipher.getAuthTag().toString("hex");
        return `${iv.toString("hex")}:${authTag}:${encrypted}`;
    } catch (e) {
        console.error("Encryption failed:", e);
        return null;
    }
}

export async function decrypt(data) {
    if (!data) return null;

    try {
        const [ivHex, authTagHex, encryptedText] = decodeURIComponent(data).split(":");
        if (!ivHex || !authTagHex || !encryptedText) return null;

        const iv = Buffer.from(ivHex, "hex");
        const authTag = Buffer.from(authTagHex, "hex");
        const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encryptedText, "hex", "utf8");
        decrypted += decipher.final("utf8");

        return JSON.parse(decrypted);
    } catch (e) {
        console.error("Decryption failed:", e);
        return null;
    }
}
// Set session (store plain object)
export async function setSessionServer(values = {}) {
    const cookieStore = await cookies();
    const currentSession = await getSessionServer();
    const merged = { ...currentSession, ...values };

    cookieStore.set({
        name: "_",
        value: JSON.stringify(merged), // plain JSON string
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    console.log("Session set:", merged);
}

// Get session
export async function getSessionServer(query) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("_");
    const sessionStr = cookie?.value;

    if (!sessionStr) return query ? null : {};

    let data;
    try {
        data = JSON.parse(sessionStr);
    } catch (e) {
        console.error("Session parse error:", e);
        return query ? null : {};
    }

    if (!query) return data;
    if (Array.isArray(query)) {
        const res = {};
        query.forEach((k) => (res[k] = data[k] ?? null));
        return res;
    }

    return data[query] ?? null;
}

// Clear session
export async function clearSessionServer() {
    const cookieStore = await cookies();
    cookieStore.delete("_");
    redirect("/");
}
