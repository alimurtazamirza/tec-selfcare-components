"use client";
import { requestOtp } from "@/business";
import { Box, Button, TextField, Typography } from "@mui/material";

export function RequestOtp() {
    async function action(formData) {

        const phone = formData.get("phone");
        await requestOtp(phone);
    }

    return (
        <Box p={3}>
            <Typography variant="h4" fontWeight={700}>
                Enter your phone number
            </Typography>

            <Typography color="text.secondary" mt={1}>
                Please enter your Sudani number to login to your account
            </Typography>

            <form action={action}>
                <TextField
                    fullWidth
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="+249 12xxxxxxx"
                    margin="normal"
                />

                <Button fullWidth type="submit" size="large" variant="contained">
                    Next
                </Button>
            </form>
        </Box>
    );
}
