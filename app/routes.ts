import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
	layout("routes/_store.tsx", [
		index("routes/home.tsx"),
		route("catalog", "routes/catalog.tsx"),
		route("p/:slug", "routes/product.$slug.tsx"),
		route("contact", "routes/contact.tsx"),
	]),
	route("photo/:id", "routes/photo.$id.tsx"),
	...prefix("admin", [
		route("login", "routes/admin/login.tsx"),
		route("logout", "routes/admin/logout.tsx"),
		layout("routes/admin/_layout.tsx", [
			index("routes/admin/index.tsx"),
			route("products/new", "routes/admin/products.new.tsx"),
			route("products/:id/edit", "routes/admin/products.$id.edit.tsx"),
			route("settings", "routes/admin/settings.tsx"),
		]),
	]),
] satisfies RouteConfig;
