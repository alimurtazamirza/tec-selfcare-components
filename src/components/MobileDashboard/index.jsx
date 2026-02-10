"use client";

import { Box } from "@mui/material";

// Import default widgets from the library's internal UI folder
import {
    ServicesCarousel as DefaultServicesCarousel,
    NewsCarousel as DefaultNewsCarousel,
    LoyaltyCard as DefaultLoyaltyCard,
    UsageCard as DefaultUsageCard,
    UserCard as DefaultUserCard
} from "../../ui";

/**
 * Reusable Mobile Dashboard Layout
 * * @typedef {Object} PageStyles
 * @property {import("@mui/material").SxProps} [container] - Main container style
 * * @param {Object} props
 * @param {Object} [props.user] - User info { name, phone, balance }
 * @param {string[]} [props.newsImages] - Array of image URLs for the news carousel
 * @param {Object[]} [props.services] - Array of service objects { name, icon, background }
 * @param {number} [props.loyaltyPoints] - Loyalty points to display
 * @param {React.ComponentType} [props.UserCard] - User Card Component (defaults to ../../ui)
 * @param {React.ComponentType} [props.UsageCard] - Usage Card Component (defaults to ../../ui)
 * @param {React.ComponentType} [props.LoyaltyCard] - Loyalty Card Component (defaults to ../../ui)
 * @param {React.ComponentType} [props.NewsCarousel] - News Carousel Component (defaults to ../../ui)
 * @param {React.ComponentType} [props.ServicesCarousel] - Services Carousel Component (defaults to ../../ui)
 * @param {PageStyles} [props.styles] - Custom styles
 */
export default function MobileDashboard({
    // Data Props
    user = { name: "Mohammed Ali", phone: "0123000000", balance: 189000.12 },
    loyaltyPoints = 4000,
    newsImages = [],
    services = [],

    // Component Injection (defaults from ../../ui)
    UserCard = DefaultUserCard,
    UsageCard = DefaultUsageCard,
    LoyaltyCard = DefaultLoyaltyCard,
    NewsCarousel = DefaultNewsCarousel,
    ServicesCarousel = DefaultServicesCarousel,

    // Styles
    styles = {}
}) {
    // Default data for services if none provided
    const defaultServices = [
        {
            name: "Anghami",
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyqicZNYpD6_qEHSLOCqCbzhHhqHWjkQjgwg&s",
            background: "#000000"
        },
        {
            name: "Shahid",
            icon: "https://images.squarespace-cdn.com/content/v1/580c656846c3c40d23a04486/1598414643629-JXP9GCYSYEWI5HYIJC12/Screen+Shot+2020-08-25+at+7.32.55+PM.png?format=2500w",
            background: "rgb(24 26 33)"
        },
        {
            name: "Netflix",
            icon: "https://freepnglogo.com/images/all_img/1723823527netflix-white-logo-png.png",
            background: "red"
        },
    ];

    // Default images for news if none provided
    const defaultNewsImages = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0z6hqcDtoPwIGdR9BCZeY_9Q_naNRuDxawg&s",
        "https://api.skyne.com/uploads/xlarge_image_2_fae5b671a3.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCn-SvZg_UCRVy6impbZZb50-NbqOLybJqBQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStX-Tr_DrWZCaoF7Gkzdl5-tjt9g8i8Yi6ug&s",
    ];

    return (
        <Box sx={[{ pb: 10 }, styles.container]}> {/* pb for bottom nav space */}
            
            {UserCard && (
                <UserCard 
                    name={user.name} 
                    phone={user.phone} 
                    balance={user.balance} 
                />
            )}

            {UsageCard && (
                <UsageCard 
                    width="95%" 
                    marginTop={-3} 
                />
            )}

            {LoyaltyCard && (
                <LoyaltyCard 
                    points={loyaltyPoints} 
                    width="95%" 
                />
            )}

            {NewsCarousel && (
                <NewsCarousel
                    width="95%"
                    images={newsImages.length > 0 ? newsImages : defaultNewsImages}
                />
            )}

            {ServicesCarousel && (
                <ServicesCarousel 
                    services={services.length > 0 ? services : defaultServices} 
                />
            )}
            
        </Box>
    );
}