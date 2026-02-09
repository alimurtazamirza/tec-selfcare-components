"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "../../context";

/**
 * Reusable Dashboard Container
 * * @param {Object} props
 * @param {React.ComponentType} props.MobileDashboard - Mobile dashboard component
 * @param {React.ComponentType} props.WebDashboard - Web dashboard component
 * @param {Object} [props.styles] - Optional styles object to pass down
 */
export default function Dashboard({ 
  MobileDashboard, 
  WebDashboard,
  styles = {}
}) {
    const { session } = useAppContext();
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);

        const check = () => {
            // Match the 'md' breakpoint (900px) used in your other components
            setIsMobile(window.innerWidth < 900); 
        };

        check();
        window.addEventListener("resize", check);

        return () => window.removeEventListener("resize", check);
    }, []);

    // Prevent hydration mismatch (don't render anything until client-side is ready)
    if (!mounted) return null;

    // Common props passed to both dashboards
    const dashboardProps = {
        session,
        styles
    };

    return isMobile 
        ? <MobileDashboard {...dashboardProps} /> 
        : <WebDashboard {...dashboardProps} />;
}