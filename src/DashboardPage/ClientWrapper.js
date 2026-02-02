"use client";

import { Box } from "@mui/material";

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
  onLogout,
  children,
}) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Mobile Sidebar */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {MobileSidebar && <MobileSidebar user={user} onLogout={onLogout} />}
      </Box>

      {/* Web Sidebar */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        {WebSidebar && <WebSidebar user={user} onLogout={onLogout} />}
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {Header && <Header user={user} onLogout={onLogout} />}
        
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {Content ? <Content user={user} /> : children}
        </Box>
      </Box>
    </Box>
  );
}