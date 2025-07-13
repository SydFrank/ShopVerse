import { adminRoutes } from "./adminRoutes";
import { sellerRoutes } from "./sellerRoutes";

// Combine admin and seller routes into privateRoutes
export const privateRoutes = [...adminRoutes, ...sellerRoutes];

// Export the combined private routes
export default privateRoutes;
