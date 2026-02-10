"use client";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const offers = [
    {title: "5GB addon bundle", price: 15},
    {title: "3GB addon bundle pkg", price: 20},
    {title: "1GB addon bundle pkg", price: 10},
    {title: "10GB data pack", price: 25},
    {title: "Unlimited calls", price: 30},
];

export default function PremiumOffers() {
    return (

        <Card
            sx={{
                position: "relative",
                overflow: "hidden",
                p: 2,
                borderRadius: 3,
                // minHeight: 140,
                width: "100%",
                margin: "0 auto",
                mt: 2,
                // color: "#fff",
            }}
        >
            {/* Header */}
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                // mb={1}
            >
                <Typography variant="h6" fontWeight={600}>
                    Premium Offers
                </Typography>

                <Button
                    variant="text"
                    sx={{color: "primary.main", textTransform: "none"}}
                >
                    View All
                </Button>
            </Stack>

            {/* Cards */}
            <Stack direction="row" spacing={2} overflow="auto">
                {offers.map((item, index) => (
                    <Card
                        key={index}
                        sx={{
                            minWidth: 280,
                            borderRadius: 3,
                            border: "1px solid hsl(210 20% 85%)",
                            boxShadow: "none",
                        }}
                    >
                        <CardContent>
                            <Box sx={{display: "flex", justifyContent: "left", alignItems:"center",  mb: 2}}>
                                <Box
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 2,
                                        backgroundColor: "#d86adf",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        // mb: 2,
                                    }}
                                >
                                    <Inventory2OutlinedIcon sx={{color: "#fff"}}/>

                                </Box>

                                <Typography variant="body2" fontWeight={700} ml={3}>
                                    {item.title}
                                </Typography>
                            </Box>

                            <Typography fontWeight={700} fontSize={18}>
                                ${item.price.toFixed(2)}
                            </Typography>

                            <Button
                                variant="text"
                                sx={{
                                    p: 0,
                                    textTransform: "none",
                                    fontWeight: 500,
                                }}
                            >
                                Learn More &gt;
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Card>
    );
}
