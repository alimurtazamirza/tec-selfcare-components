import ClientWrapper from "./ClientWrapper.js";

/**
 * Reusable Dashboard Page Component (Server Component)
 * Handles data fetching and passes to client wrapper
 * 
 * @param {Object} props
 * @param {React.ComponentType} props.MobileSidebar - Mobile sidebar component
 * @param {React.ComponentType} props.WebSidebar - Web sidebar component
 * @param {React.ComponentType} props.Header - Header component
 * @param {React.ComponentType} props.Content - Main content component
 * @param {Function} props.getUserFn - Async function to fetch user data (optional)
 * @param {Object} props.user - User data object (if already fetched)
 * @param {Function} props.onLogout - Logout handler function
 * @param {React.ReactNode} props.children - Child components
 */
export default async function DashboardPage({
  MobileSidebar,
  WebSidebar,
  Header,
  Content,
  getUserFn,
  user: providedUser,
  onLogout,
  children,
}) {
  // Fetch user data if getUserFn is provided and user wasn't passed
  let user = providedUser;
  if (!user && getUserFn) {
    try {
      user = await getUserFn();
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      user = null;
    }
  }

  return (
    <ClientWrapper
      MobileSidebar={MobileSidebar}
      WebSidebar={WebSidebar}
      Header={Header}
      Content={Content}
      user={user}
      onLogout={onLogout}
    >
      {children}
    </ClientWrapper>
  );
}