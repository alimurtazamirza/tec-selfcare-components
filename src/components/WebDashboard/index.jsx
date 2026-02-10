"use client";

import { Box, Avatar, Card, Button, Stack, Typography } from "@mui/material";

// Import default widgets from the library's internal UI folder
import { 
    LoyaltyCard as DefaultLoyaltyCard, 
    NewsCarousel as DefaultNewsCarousel, 
    PremiumOffers as DefaultPremiumOffers, 
    UsageCard as DefaultUsageCard 
} from "../../ui";

/**
 * Reusable Web Dashboard Layout
 * * @typedef {Object} PageStyles
 * @property {import("@mui/material").SxProps} [container] - Main container style
 * @property {import("@mui/material").SxProps} [userCard] - User info card style
 * @property {import("@mui/material").SxProps} [avatar] - Avatar style
 * @property {import("@mui/material").SxProps} [planSection] - Right-side plan details style
 * * @param {Object} props
 * @param {Object} [props.user] - User info { name, contact, avatarLabel }
 * @param {Object} [props.plan] - Plan info { label, name }
 * @param {Function} [props.onViewBill] - Handler for "View Bill" button
 * @param {string[]} [props.newsImages] - Array of image URLs for the carousel
 * @param {number} [props.loyaltyPoints] - Points to display
 * @param {React.ComponentType} [props.UsageCard] - Usage Card Component (defaults to library version)
 * @param {React.ComponentType} [props.LoyaltyCard] - Loyalty Card Component (defaults to library version)
 * @param {React.ComponentType} [props.PremiumOffers] - Premium Offers Component (defaults to library version)
 * @param {React.ComponentType} [props.NewsCarousel] - News Carousel Component (defaults to library version)
 * @param {PageStyles} [props.styles] - Custom styles
 */
export default function WebDashboard({
  // Data Props
  user = { name: "Ali Tahir", contact: "(404) 921‑8447", avatarLabel: "A" },
  plan = { label: "Your Main Plan is", name: "STARTER" },
  onViewBill = () => {},
  newsImages = [],
  loyaltyPoints = 4000,

  // Component Injection (with default fallbacks from ../../ui)
  UsageCard = DefaultUsageCard,
  LoyaltyCard = DefaultLoyaltyCard,
  PremiumOffers = DefaultPremiumOffers,
  NewsCarousel = DefaultNewsCarousel,

  // Styles
  styles = {}
}) {
  return (
    <Box sx={[{ flexGrow: 1, p: 3 }, styles.container]}>
      
      {/* 1. User Info Card */}
      <Card
        sx={[
          {
            p: 3,
            mb: 3,
            borderRadius: 4,
            background: "linear-gradient(135deg, #0F2027, #203A43, #2C5364)",
            color: "#fff",
          },
          styles.userCard
        ]}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar 
            sx={[{ bgcolor: "rgba(255,255,255,0.3)" }, styles.avatar]}
          >
            {user.avatarLabel}
          </Avatar>
          
          <Box>
            <Typography fontWeight={700}>{user.name}</Typography>
            <Typography variant="body2">{user.contact}</Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box textAlign="right" sx={styles.planSection}>
            <Typography variant="body2">{plan.label}</Typography>
            <Typography fontWeight={700}>{plan.name}</Typography>
            <Button 
                variant="outlined" 
                onClick={onViewBill}
                sx={{ 
                    mt: 1, 
                    color: "#fff", 
                    borderColor: "#fff", 
                    '&:hover': { borderColor: '#ddd', bgcolor: 'rgba(255,255,255,0.1)' } 
                }}
            >
              View Bill Statement
            </Button>
          </Box>
        </Stack>
      </Card>

      {/* 2. Widgets Section */}
      {/* These now default to the imports from ../../ui if not passed by the parent */}
      
      {UsageCard && <UsageCard size={200} />}
      
      {LoyaltyCard && <LoyaltyCard points={loyaltyPoints} />}

      {PremiumOffers && <PremiumOffers />}

      {NewsCarousel && (
        <NewsCarousel
          name="Promotion"
          images={newsImages.length > 0 ? newsImages : [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCn-SvZg_UCRVy6impbZZb50-NbqOLybJqBQ&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoesazztkEM3UOiXIO4bBmbIvFGrQGu1eEbw&s",
            "https://api.skyne.com/uploads/xlarge_image_2_fae5b671a3.webp",
          ]}
        />
      )}
    </Box>
  );
}