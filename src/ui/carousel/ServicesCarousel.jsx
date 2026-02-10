"use client";
import {Box, Card, Typography} from "@mui/material";

export default function ServicesCarousel({services}) {
    return (
        <Box mt={2} sx={{width: "95%", margin: "0 auto"}}>
            <Typography
                variant="subtitle2"
                sx={{
                    display: "block",
                    mt: 2,
                    textAlign: "left",
                }}
            >
                Premium Services
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 2,
                }}
            >
                {services.map((s, i) => (
                    <Box key={i} sx={{minWidth: 150}}>
                        <Card
                            sx={{
                                minWidth: 150,
                                minHeight: 100,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: s.background,
                                borderRadius: 2,
                            }}
                        >
                            <img
                                src={s.icon}
                                alt={s.name}
                                style={{width: 120, height: 80}}
                            />
                        </Card>

                        <Typography
                            variant="caption"
                            sx={{
                                display: "block",
                                mt: 0.5,
                                fontWeight: "bold",
                                textAlign: "left",
                            }}
                        >
                            {s.name}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}