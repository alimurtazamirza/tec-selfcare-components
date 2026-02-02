"use client";

import { Box } from "@mui/material";
import { useTransition } from "react";

/**
 * Client Wrapper for Dashboard Page
 * Handles client-side interactivity and component rendering
 */
export default function DashboardPageClient({
  MobileSidebar,
  WebSidebar,
  Header,
  Content,
  user,
  onLogoutAction,
  children,
}) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    if (onLogoutAction) {
      startTransition(async () => {
        await onLogoutAction();
      });
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Mobile Sidebar */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {MobileSidebar && (
          <MobileSidebar 
            user={user} 
            onLogout={handleLogout}
            isLoggingOut={isPending}
          />
        )}
      </Box>

      {/* Web Sidebar */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        {WebSidebar && (
          <WebSidebar 
            user={user} 
            onLogout={handleLogout}
            isLoggingOut={isPending}
          />
        )}
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {Header && (
          <Header 
            user={user} 
            onLogout={handleLogout}
            isLoggingOut={isPending}
          />
        )}
        
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {Content ? <Content user={user} /> : children}
        </Box>
      </Box>
    </Box>
  );
}