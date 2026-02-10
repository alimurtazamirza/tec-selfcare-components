"use client";
import {Card, Box, Typography, Button} from "@mui/material";

export default function UserCard({name, phone, balance}) {
    return (
        <Card sx={{p: 2, bgcolor: "#2E3B7C", color: "#fff", borderRadius: 0}}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box
                        sx={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            backgroundColor: "#003CA5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: 1
                        }}
                    >
                        <Typography variant="h6" sx={{color: "#fff", fontWeight: 700}}>
                            M
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2">Welcome,</Typography>
                        <Typography variant="h6" fontWeight={700}>{name}</Typography>
                        <Typography variant="caption">Prepaid</Typography>
                    </Box>
                </Box>
                <Box>
                    <Button variant="outlined" sx={{borderRadius: 5, color: "#fff"}}>
                        {phone}
                    </Button>
                </Box>
            </Box>
            <Box pb={3} mt={2} display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="flex-end">
                    {(() => {
                        const [integer, decimal] = balance.toFixed(2).split(".");
                        return (
                            <>
                                <Typography variant="h5" fontWeight={700}>
                                    {integer}.
                                </Typography>
                                <Typography variant="body2" fontWeight={700} sx={{pb:0.3}}>
                                    {decimal}
                                </Typography>
                            </>
                        );
                    })()}
                    <Typography variant="body2" fontWeight={700} sx={{pb:0.3, pl:0.5}}>
                        SDG
                    </Typography>
                </Box>


                <Button variant="outlined" sx={{borderColor: "primary", borderRadius: 5, color: "#fff"}}>+ Add
                    Balance</Button>
            </Box>
        </Card>
    );
}
