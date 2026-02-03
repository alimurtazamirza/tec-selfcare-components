// Export all components from a single entry point
export { default as LoginPage } from "./LoginPage/index.js";
export { default as DashboardPage } from "./DashboardPage/index.js";

// You can also create named exports for convenience
import LoginPage from "./LoginPage/index.jsx";
import DashboardPage from "./DashboardPage/index.jsx";

export default {
  LoginPage,
  DashboardPage,
};