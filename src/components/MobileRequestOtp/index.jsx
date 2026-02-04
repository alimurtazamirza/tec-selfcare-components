"use client";
import { requestOtp } from "../../business";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function MobileRequestOtp({
  title = "Enter your phone number",
  description = "Please enter your Sudani number to login to your account",
  placeholder = "+249 12xxxxxxx",
  buttonText = "Next",
}) {
   async function action(formData) {
        const phone = formData.get("phone");
        await requestOtp(phone);
    }


  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={700}>
        {title}
      </Typography>

      <Typography color="text.secondary" mt={1}>
        {description}
      </Typography>

      <form action={action}>
        <TextField
          fullWidth
          name="phone"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={placeholder}
          margin="normal"
          required
        />

        <Button fullWidth type="submit" size="large" variant="contained">
          {buttonText}
        </Button>
      </form>
    </Box>
  );
}