// import { Router, Route, RootRoute, NotFoundRoute } from '@tanstack/react-router'

// const rootRoute = new RootRoute()
// const indexRoute = new Route({ getParentRoute: () => rootRoute, path: '/' })

// // Just an example of routing
// // const blogRoute = new Route({ getParentRoute: () => rootRoute, path: 'blog' })
// // const blogIndexRoute = new Route({ getParentRoute: () => blogRoute, path: '/' })
// // const routeConfig = rootRoute.addChildren([
// // 	indexRoute,
// // 	blogRoute.addChildren([blogIndexRoute]),
// // ])

// const routeTree = rootRoute.addChildren([rootRoute, indexRoute])

// const notFoundRoute = new NotFoundRoute({
// 	getParentRoute: () => rootRoute,
// 	component: () => <></>,
// })

// const router = new Router({
// 	routeTree,
// 	notFoundRoute,
// })
