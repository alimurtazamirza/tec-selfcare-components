"use client";

import { Box, AppBar, Toolbar, Typography, IconButton, Avatar, Card, Button, Stack, TextField } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import {LoyaltyCard, NewsCarousel, PremiumOffers, UsageCard} from "@/components";

export default function DashboardPage() {
    return (
            <Box sx={{ flexGrow: 1 }}>
                {/* Dashboard Body */}
                <Box sx={{ p: 3 }}>
                    {/* User Card */}
                    <Card
                        sx={{
                            p: 3,
                            mb: 3,
                            borderRadius: 4,
                            background: "linear-gradient(135deg, #0F2027, #203A43, #2C5364)",
                            color: "#fff",
                        }}
                    >
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar sx={{ bgcolor: "rgba(255,255,255,0.3)" }}>A</Avatar>
                            <Box>
                                <Typography fontWeight={700}>Ali Tahir</Typography>
                                <Typography variant="body2">(404) 921‑8447</Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box textAlign="right">
                                <Typography variant="body2">Your Main Plan is</Typography>
                                <Typography fontWeight={700}>STARTER</Typography>
                                <Button variant="outlined" sx={{ mt: 1, color: "#fff", borderColor: "#fff" }}>
                                    View Bill Statement
                                </Button>
                            </Box>
                        </Stack>
                    </Card>

                    {/* Resources */}
                    <UsageCard size={200}/>
                    <LoyaltyCard points={4000}/>


                    <PremiumOffers />
                    <NewsCarousel
                        images={[
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCn-SvZg_UCRVy6impbZZb50-NbqOLybJqBQ&s",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoesazztkEM3UOiXIO4bBmbIvFGrQGu1eEbw&s",
                            "https://api.skyne.com/uploads/xlarge_image_2_fae5b671a3.webp",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0z6hqcDtoPwIGdR9BCZeY_9Q_naNRuDxawg&s",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStX-Tr_DrWZCaoF7Gkzdl5-tjt9g8i8Yi6ug&s",
                        ]}
                        name="Promotion"/>
                </Box>
            </Box>
    );
}
