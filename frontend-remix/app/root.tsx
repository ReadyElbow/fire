import type { LinksFunction } from "@remix-run/node";
import { cssBundleHref } from '@remix-run/css-bundle';
import blackColorAStyle from "@radix-ui/colors/black-alpha.css"
import blueColorStyle from "@radix-ui/colors/blue.css";
import fontStyle from "./styles/fonts.css"
import generalStyle from "./styles/general.css"
import Navbar from "./components/Navbar";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [
    { rel: 'stylesheet', href: cssBundleHref },
    { rel: 'stylesheet', href: blueColorStyle},
    { rel: 'stylesheet', href: blackColorAStyle},
    { rel: 'stylesheet', href: fontStyle},
    { rel: 'stylesheet', href: generalStyle}
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
      <body>
        <Navbar></Navbar>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
