import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Navbar } from "./routes/_components.header/route";
import blackColorAStyle from "@radix-ui/colors/black-alpha.css"
import blueColors from "@radix-ui/colors/blue.css";
import greenColors from "@radix-ui/colors/green.css";
import orangeColors from "@radix-ui/colors/orange.css"
import redColors from "@radix-ui/colors/tomato.css"
import fontStyle from "./styles/fonts.css"
import generalStyle from "./styles/general.css"

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [
    { rel: "stylesheet", href: cssBundleHref },
    { rel: "stylesheet", href: blueColors},
    { rel: "stylesheet", href: greenColors},
    { rel: "stylesheet", href: orangeColors},
    { rel: "stylesheet", href: redColors},
    { rel: "stylesheet", href: blackColorAStyle},
    { rel: "stylesheet", href: fontStyle},
    { rel: "stylesheet", href: generalStyle}
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
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

