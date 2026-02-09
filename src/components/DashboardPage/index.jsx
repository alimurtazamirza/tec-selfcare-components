// In your library repo: src/DashboardPage.js
"use client";

import { useEffect, useState } from "react";

/**
 * Reusable Dashboard Page (Library Component)
 * * NOTE: This component does NOT import context directly.
 * It expects 'session' to be passed from the parent.
 */
export default function DashboardPage({ 
  MobileDashboard, 
  WebDashboard,
  session = null,
  styles = {}
}) {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const check = () => setIsMobile(window.innerWidth < 900);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    if (!mounted) return null;

    // Pass the session (received from parent) down to child dashboards
    const dashboardProps = {
        session, 
        styles
    };

    return isMobile 
        ? <MobileDashboard {...dashboardProps} /> 
        : <WebDashboard {...dashboardProps} />;
}