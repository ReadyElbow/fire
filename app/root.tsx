import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import fontStyle from "./styles/fonts.css"
import generalStyle from "./styles/general.css"
import themeStyle from "./theme.css"
import MainLayout from "./components/NavBar/navbar";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [
    { rel: "stylesheet", href: cssBundleHref },
    { rel: "stylesheet", href: fontStyle },
    { rel: "stylesheet", href: generalStyle },
    { rel: "stylesheet", href: themeStyle },
  ] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark">
        <MainLayout />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

