"use client";

import { Box, Button, TextField, Typography, Card } from "@mui/material";
import { requestOtp } from "../../business";

/**
 * Reusable Request OTP Page Component
 *
 * @param {Object} props
 * @param {string} props.logo - Logo image URL
 * @param {string} props.backgroundImage - Background image URL
 * @param {string} props.welcomeTitle - Welcome title text
 * @param {string} props.pageTitle - Page title
 * @param {string} props.pageSubtitle - Page subtitle
 * @param {string} props.pageDescription - Page description
 * @param {string} props.fieldLabel - Input field label
 * @param {string} props.fieldPlaceholder - Input field placeholder
 * @param {string} props.buttonText - Submit button text
 * @param {string} props.footerText - Footer text
 * @param {string} props.footerLinkText - Footer link text
 * @param {string} props.footerLink - Footer link URL
 * @param {string} props.copyrightText - Copyright text
 * @param {Object} props.styles - Custom styles object { mainContainer, leftPanel, rightPanel, card, button, input }
 */
export default function WebRequestOtp({
  logo = "https://tec.evampsaanga.com/media/api/widget/item/125.jpg",
  backgroundImage = "https://scportal.evampsaanga.com/assets/images/sign-in/sign-in-background.svg",
  welcomeTitle = "Welcome to the Fastest Telco Network",
  pageTitle = "Login",
  pageSubtitle = "Welcome",
  pageDescription = "Login to manage your account. Stay connected, pay bills, and explore new features effortlessly",
  fieldLabel = "Username / Number",
  fieldPlaceholder = "+249 12xxxxxxx",
  buttonText = "Next",
  footerText = "Dont have an account yet?",
  footerLinkText = "Register Now",
  footerLink = "#",
  copyrightText = "© 2025 — All rights reserved",
  styles = {} // Default empty object for custom styles
}) {
  async function action(formData) {
    const phone = formData.get("phone");
    await requestOtp(phone);
  }

  return (
    <Box
      sx={[
        {
          display: "flex",
          minHeight: "100vh",
        },
        styles.mainContainer, // Override main container styles
      ]}
    >
      {/* Left Side (Image) */}
      <Box
        sx={[
          {
            width: "50%",
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", md: "block" },
            position: "relative",
          },
          styles.leftPanel, // Override left panel styles
        ]}
      >
        <Box sx={{ position: "absolute", bottom: "10%", left: "6%" }}>
          {logo && (
            <img
              src={logo}
              alt="Logo"
              width={120}
              height={40}
              style={{ marginBottom: "1rem" }}
            />
          )}
          <Typography variant="h4" color="warning">
            {welcomeTitle}
          </Typography>
        </Box>
      </Box>

      {/* Right Side (Form) */}
      <Box
        sx={[
          {
            width: { xs: "100%", md: "50%" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          },
          styles.rightPanel, // Override right panel wrapper
        ]}
      >
        <Card
          sx={[
            {
              width: "100%",
              maxWidth: 440,
              // Removed fixed height to allow content to dictate height, 
              // but you can add it back via props if needed.
              p: 4,
              boxShadow: 3,
              borderRadius: 5,
            },
            styles.card, // Override card styles
          ]}
        >
          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mt: 1 }}>
            {pageTitle}
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            {pageSubtitle}
          </Typography>
          <Typography variant="body2" mt={2} mb={3} color="text.secondary">
            {pageDescription}
          </Typography>

          <form action={action}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
                letterSpacing: "0.04em",
              }}
            >
              {fieldLabel}
            </Typography>

            <TextField
              fullWidth
              name="phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={fieldPlaceholder}
              margin="normal"
              required
              // Merge internal SX with passed SX
              sx={[
                 { borderRadius: 4 }, 
                 styles.input 
              ]}
              // If you want to style the internal input/label specifically:
              InputProps={{
                 sx: styles.inputInner 
              }}
            />

            <Button
              fullWidth
              type="submit"
              size="large"
              variant="contained"
              sx={[
                { mt: 2, fontSize: 16, fontWeight: 900, borderRadius: 3 },
                styles.button, // Override button styles (e.g. background color)
              ]}
            >
              {buttonText}
            </Button>
          </form>

          <Typography color="body1" textAlign="center" mt={5}>
            {footerText} <a href={footerLink} style={styles.link || {}}>{footerLinkText}</a>
          </Typography>
          <Typography
            variant="body2"
            mt={2}
            textAlign="center"
            sx={{
              color: "text.secondary",
              letterSpacing: "0.08em",
              fontWeight: 400,
              opacity: 0.85,
            }}
          >
            {copyrightText}
          </Typography>
        </Card>
      </Box>
    </Box>
  );
}