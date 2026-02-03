"use client";
import {Box} from "@mui/material";
import {ServicesCarousel, NewsCarousel, LoyaltyCard, UsageCard, UserCard} from "@/components";

export default function DashboardPage() {
    return (
        <Box sx={{pb: 10}}> {/* pb for bottom nav */}
            <UserCard name="Mohammed Ali" phone="0123000000" balance={189000.12}/>
            <UsageCard width="95%" marginTop={-3}/>
            <LoyaltyCard points={4000} width="95%"/>
            <NewsCarousel
                width="95%"
                images={[
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0z6hqcDtoPwIGdR9BCZeY_9Q_naNRuDxawg&s",
                    "https://api.skyne.com/uploads/xlarge_image_2_fae5b671a3.webp",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCn-SvZg_UCRVy6impbZZb50-NbqOLybJqBQ&s",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStX-Tr_DrWZCaoF7Gkzdl5-tjt9g8i8Yi6ug&s",
                ]}/>
            <ServicesCarousel services={[
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
            ]}/>
        </Box>
    );
}