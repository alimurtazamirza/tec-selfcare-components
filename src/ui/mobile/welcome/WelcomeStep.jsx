"use client";

import {
    Box,
    Button,
    Typography,
    Stack,
    Chip,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import Image from "next/image";

export default function WelcomeStep({onNext, content}) {
    return (
        <Box
            sx={{
                minHeight: "100dvh",
                width: "100%",
                position: "relative",
                bgcolor: "#000",
                overflow: "hidden",
            }}
        >
            <Image
                src={content.image}
                alt="Onboarding"
                fill
                priority
                style={{
                    objectFit: "cover",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.9))",
                    zIndex: 1,
                }}
            />
            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                    minHeight: "100dvh",
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                }}
            >
                <Box sx={{display: "flex", justifyContent: "center", mt: 1}}>
                    <Chip
                        icon={<LanguageIcon/>}
                        label="عربی"
                        sx={{
                            bgcolor: "#fff",
                            fontWeight: 500,
                        }}
                    />
                </Box>
                <Box sx={{mt: "auto", pb: 2}}>
                    <Box sx={{mb: 6}}>
                        <Stack spacing={2}>
                            <Typography
                                variant="h4"
                                fontWeight={700}
                                color="white"
                                lineHeight={1.2}
                            >
                                {content.text.simple}{" "}
                                <Box component="span" sx={{color: "#FFD400"}}>
                                    {content.text.hilighted}
                                </Box>
                            </Typography>
                        </Stack>
                    </Box>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={onNext}
                        sx={{
                            width: "100%",
                            borderRadius: 2,
                            py: 1.4,
                            fontSize: 16,
                            textTransform: "none",
                            "&:hover": {
                                bgcolor: "#1E40AF",
                            },
                        }}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
