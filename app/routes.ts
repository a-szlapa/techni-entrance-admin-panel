import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
    index("routes/login.tsx"),
    index("/panel", "routes/panel.tsx"),
] satisfies RouteConfig;
