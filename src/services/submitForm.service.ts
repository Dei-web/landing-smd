import type { FormContact } from "../types/formContact.types";

export default async function submitContactForm(data: FormContact): Promise<Response> {
    const apiSecret = import.meta.env.VITE_CONTACT_API_SECRET;
    const apiKey = import.meta.env.VITE_CONTACT_API_KEY
    const apiUrl = import.meta.env.VITE_API_URL;

    const payload = {
        ...data,
        ts: Math.floor(Date.now() / 1000),
    }

    const bodyString = JSON.stringify(payload);

    const signature = await crypto.subtle
        .importKey(
            "raw",
            new TextEncoder().encode(apiSecret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign"]
        )
        .then(key =>
            crypto.subtle.sign("HMAC", key, new TextEncoder().encode(bodyString))
        )
        .then(buf =>
            Array.from(new Uint8Array(buf))
                .map(b => b.toString(16).padStart(2, "0"))
                .join("")
        );

    const response = await fetch(`${apiUrl}/api/sendEmail`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-API-KEY": apiKey,
            "X-SIGNATURE": signature
        },
        body: bodyString
    });

    return response;
}