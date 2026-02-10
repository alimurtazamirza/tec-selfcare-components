// javascript
"use client";
import {Card, Box, Typography, Button} from "@mui/material";
import {Star} from "@mui/icons-material";

export default function LoyaltyCard({points, width}) {
    return (
        <Card
            sx={{
                position: "relative",
                overflow: "hidden",
                p: 2,
                borderRadius: 3,
                minHeight: 140,
                width: width || "100%",
                margin: "0 auto",
                mt: 2,
                backgroundImage: `url('/loyalty-program-bg.png')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                // color: "#fff",
            }}
        >
            <Box/>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box display="flex" alignItems="center" gap={2}>
                    <Star color="warning" sx={{background: "#fff", borderRadius: 5, p: 1, fontSize: "36px"}}/>
                    <Box>
                        <Typography>Loyalty Program</Typography>
                        <Typography variant="h5" fontWeight={700} sx={{mt: 0.5}}>
                            {points.toLocaleString()} Pts
                        </Typography>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "rgba(0,0,0,0.25)",
                        borderRadius: 12
                    }}
                >
                    See All
                </Button>
            </Box>
        </Card>
    );
}