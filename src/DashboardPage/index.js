import { Box } from "@mui/material";

/**
 * Reusable Dashboard Page Component
 * 
 * @param {Object} props
 * @param {React.ComponentType} props.MobileSidebar - Mobile sidebar component
 * @param {React.ComponentType} props.WebSidebar - Web sidebar component
 * @param {React.ComponentType} props.Header - Header component
 * @param {React.ComponentType} props.Content - Main content component
 * @param {Object} props.user - User data object
 * @param {Function} props.onLogout - Logout handler function
 */
export default async function DashboardPage({
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