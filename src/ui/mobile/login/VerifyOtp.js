"use client";

import { useRef, useState, useEffect } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { requestOtp, verifyOtp } from "@/business";
import { decrypt } from "@/lib";
import { useSearchParams } from "next/navigation";

export function VerifyOtp() {
    const searchParams = useSearchParams(); // client-side
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [msisdn, setMsisdn] = useState(null);
    const inputsRef = useRef([]);

    // 🔹 Decrypt query param on mount
    useEffect(() => {
        const encryptedData = searchParams.get("data");
        if (!encryptedData) return;

        (async () => {
            try {
                const decrypted = await decrypt(decodeURIComponent(encryptedData));
                const params = JSON.parse(decrypted);
                setMsisdn(params.msisdn || null);
            } catch (err) {
                console.error("Decrypt failed:", err);
            }
        })();
    }, [searchParams]);

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const nextOtp = [...otp];
        nextOtp[index] = value;
        setOtp(nextOtp);

        if (value && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const nextOtp = [...otp];
            nextOtp[index - 1] = "";
            setOtp(nextOtp);
            inputsRef.current[index - 1]?.focus();
        }
    };

    const submitOtp = async () => {
        const code = otp.join("");
        if (code.length !== 4 || !msisdn) return;

        try {
            await verifyOtp(msisdn, code);
            console.log("OTP verified:", code, "for", msisdn);
        } catch (err) {
            console.error("OTP verification failed:", err);
        }
    };

    const resendOtp = async () => {
        if (!msisdn) return;
        try {
            await requestOtp(msisdn);
            console.log("OTP resent to", msisdn);
        } catch (err) {
            console.error("Failed to resend OTP:", err);
        }
    };

    return (
        <Box p={3}>
            <Typography variant="h4" fontWeight={700}>
                Verify OTP
            </Typography>

            <Typography color="text.secondary" mt={1}>
                Please enter the 4-digit code sent to your mobile number
            </Typography>

            <Stack direction="row" spacing={2} mt={3} justifyContent="center">
                {otp.map((digit, index) => (
                    <TextField
                        key={index}
                        value={digit}
                        inputRef={(el) => (inputsRef.current[index] = el)}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        inputProps={{
                            maxLength: 1,
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            style: {
                                textAlign: "center",
                                fontSize: 24,
                                fontWeight: 600,
                            },
                        }}
                        sx={{ width: 56 }}
                    />
                ))}
            </Stack>

            <Button
                sx={{ mt: 4 }}
                variant="contained"
                fullWidth
                disabled={otp.join("").length !== 4 || !msisdn}
                onClick={submitOtp}
            >
                Verify OTP
            </Button>

            <Button
                variant="text"
                onClick={resendOtp}
                disabled={!msisdn}
                sx={{ mt: 1 }}
            >
                Resend OTP
            </Button>
        </Box>
    );
}