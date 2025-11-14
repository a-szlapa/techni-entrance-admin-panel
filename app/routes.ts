import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/panel.tsx", [
    route("", "routes/panel/index.tsx"),
    route("logs", "routes/panel/logs.tsx"),
    route("students", "routes/panel/students.tsx"),
    route("students/:id", "routes/panel/students/$id.tsx"),
    route("user-logs", "routes/panel/user-logs.tsx"),
  ]),
  route("/login", "routes/login.tsx"),
] satisfies RouteConfig;
