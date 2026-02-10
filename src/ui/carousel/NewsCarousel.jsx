"use client";
import {Box, Card, Typography} from "@mui/material";

export default function NewsCarousel({images, width, name="News and Offers"}) {
    return (
        <Box mt={2} sx={{maxWidth: "100%", overflow: "hidden", width: width || "100%", margin: "0 auto"}}>
            <Typography
                variant="subtitle2"
                sx={{
                    display: "block",
                    mt: 2,
                    textAlign: "left",
                }}
            >
                {name}
            </Typography>

            <Box sx={{display: "flex", overflowX: "auto", gap: 1, margin: '0 auto'}}>
                {images.map((img, i) => (
                    <Card key={i} sx={{minWidth: 300, maxWidth:300, height: 200, flexShrink: 0, borderRadius: 2}}>
                        <img src={img} alt="news"
                             style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
