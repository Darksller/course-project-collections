import { App } from "@/App";
import { Collections } from "@/pages/Collections";
import { Home } from "@/pages/Home";
import { Users } from "@/pages/Users";
import { RootRoute, Route, Router } from "@tanstack/react-router";

const rootRoute = new RootRoute({ component: App });

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const collectionsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/collections",
  component: Collections,
});

const usersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/users",
  component: Users,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  collectionsRoute,
  usersRoute,
]);

export const router = new Router({ routeTree });
