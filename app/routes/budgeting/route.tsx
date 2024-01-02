import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import pageStyle from "~/styles/page_overview.css"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: pageStyle },
];

export default function BudgetingLayout() {
    return <>
      <div className="pageHeadings">
        <h1></h1>
      </div>
      <Outlet/>
    </>
}