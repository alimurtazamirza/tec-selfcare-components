// Export all components from a single entry point
export { default as LoginPage } from "./LoginPage/index.js";
export { default as DashboardPage } from "./DashboardPage/index.js";

// You can also create named exports for convenience
import LoginPage from "./LoginPage/index.js";
import DashboardPage from "./DashboardPage/index.js";

export default {
  LoginPage,
  DashboardPage,
};