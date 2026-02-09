"use client";
import { requestOtp } from "../../business";
import { Box, Button, TextField, Typography } from "@mui/material";

/**
 * Mobile Request OTP Page Component
 * * @typedef {Object} PageStyles
 * @property {import("@mui/material").SxProps} [container] - Style the main container
 * @property {import("@mui/material").SxProps} [title] - Style the page title
 * @property {import("@mui/material").SxProps} [description] - Style the description text
 * @property {import("@mui/material").SxProps} [input] - Style the phone number input field
 * @property {import("@mui/material").SxProps} [button] - Style the Next/Submit button
 * * @param {Object} props
 * @param {PageStyles} [props.styles] - Custom styling object
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {string} [props.placeholder]
 * @param {string} [props.buttonText]
 */
export default function MobileRequestOtp({
  title = "Enter your phone number",
  description = "Please enter your Sudani number to login to your account",
  placeholder = "+249 12xxxxxxx",
  buttonText = "Next",
  styles = {}
}) {
  async function action(formData) {
    const phone = formData.get("phone");
    await requestOtp(phone);
  }

  return (
    <Box sx={[{ p: 3 }, styles.container]}>
      <Typography 
        variant="h4" 
        sx={[{ fontWeight: 700 }, styles.title]}
      >
        {title}
      </Typography>

      <Typography 
        sx={[{ mt: 1, color: "text.secondary" }, styles.description]}
      >
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
          sx={styles.input}
        />

        <Button 
          fullWidth 
          type="submit" 
          size="large" 
          variant="contained"
          sx={styles.button}
        >
          {buttonText}
        </Button>
      </form>
    </Box>
  );
}