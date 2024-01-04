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
import rootStyle from "./root.css"
import themeStyle from "./theme.css"

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [
    { rel: "stylesheet", href: cssBundleHref },
    { rel: "stylesheet", href: fontStyle },
    { rel: "stylesheet", href: generalStyle },
    { rel: "stylesheet", href: rootStyle },
    { rel: "stylesheet", href: themeStyle },
  ] : []),
];


const navbarPages = [
  {
    name: "Home",
    to: "/"
  },
  {
    name: "Dashboard",
    to: "/dashboard"
  },
  {
    name: "Accounts",
    to: "/accounts"
  },
  {
    name: "Budgeting",
    to: "/budgets/expenses"
  },
  {
    name: "Personal Configuration",
    to: "/configure"
  }
]

function NavBar() {
  return <div className="navbarContainer">
    <h1 className="navbarHeader">FIRE</h1>
    <ul className="navbarList">
      {navbarPages.map((page) => {
        return <li key={page.name} className="navbarListElement">
          <NavLink
            to={page.to}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            {page.name}
          </NavLink>
        </li>
      })}
    </ul>
  </div>
}

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
        <div className="pageBreakdown">
          <NavBar />
          <div className="pageContent">
            <Outlet />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

