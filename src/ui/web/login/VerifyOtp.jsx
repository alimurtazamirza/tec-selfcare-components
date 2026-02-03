"use client";

import { useRef, useState, useEffect } from "react";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { requestOtp, verifyOtp } from "@/business";
import { decrypt } from "@/lib";
import { useSearchParams } from "next/navigation";

export function WebVerifyOtp() {
    const searchParams = useSearchParams();

    const [otp, setOtp] = useState(["", "", "", ""]);
    const [msisdn, setMsisdn] = useState(null);

    const [resendTimer, setResendTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

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

    // 🔹 Resend OTP countdown
    useEffect(() => {
        if (!canResend && resendTimer > 0) {
            const timer = setTimeout(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }

        if (resendTimer === 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCanResend(true);
        }
    }, [resendTimer, canResend]);

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
            setResendTimer(30);
            setCanResend(false);
            console.log("OTP resent to", msisdn);
        } catch (err) {
            console.error("Failed to resend OTP:", err);
        }
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Left side image */}
            <Box
                sx={{
                    width: "50%",
                    backgroundImage:
                        "url('https://scportal.evampsaanga.com/assets/images/sign-in/sign-in-background.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: { xs: "none", md: "block" },
                }}
            >
                <Box sx={{ position: "absolute", bottom: "10%", left: "6%" }}>
                    <img
                        src="https://tec.evampsaanga.com/media/api/widget/item/125.jpg"
                        alt="Telco Network"
                        width={120}
                        height={40}
                    />
                    <Typography variant="h4" color="warning">
                        Welcome to the Fastest Telco Network
                    </Typography>
                </Box>
            </Box>

            {/* Right side card */}
            <Box
                sx={{
                    width: { xs: "100%", md: "50%" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 4,
                }}
            >
                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 440,
                        height: 520,
                        p: 4,
                        boxShadow: 3,
                        borderRadius: 5,
                    }}
                >
                    <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mt: 1 }}>
                        Verify OTP
                    </Typography>

                    <Typography variant="h6" sx={{mt: 2}}>
                        Welcome
                    </Typography>
                    <Typography variant="body2" mt={2} mb={3} color="text.secondary">
                        Login to manage your account. Stay connected, pay bills, and explore
                        new features effortlessly
                    </Typography>

                    {/* OTP Inputs */}
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

                    {/* Verify Button */}
                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        sx={{ mt: 2, fontSize: 16, fontWeight: 900, borderRadius: 3 }}
                        disabled={otp.join("").length !== 4 || !msisdn}
                        onClick={submitOtp}
                    >
                        Verify OTP
                    </Button>

                    {/* Resend OTP section */}
                    <Box mt={2} textAlign="center">
                        {!canResend ? (
                            <Typography variant="body2" color="text.secondary">
                                Resend OTP in <strong>{resendTimer}</strong> sec
                            </Typography>
                        ) : (
                            <Typography variant="body2">
                                Didn’t receive the code?{" "}
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        resendOtp();
                                    }}
                                >
                                    Resend OTP
                                </a>
                            </Typography>
                        )}
                    </Box>

                    {/* Register */}
                    <Typography color="body1" textAlign="center" mt={5}>
                        Don&apos;t have an account yet? <a href="#">Register Now</a>
                    </Typography>

                    {/* Footer */}
                    <Typography
                        variant="body2"
                        mt={2}
                        textAlign="center"
                        sx={{
                            color: "text.secondary",
                            letterSpacing: "0.08em",
                            fontWeight: 400,
                            opacity: 0.85,
                        }}
                    >
                        © 2025 — All rights reserved
                    </Typography>
                </Card>
            </Box>
        </Box>
    );
}
