import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { HeaderLayout } from "~/components/PageHeader/header";
import { SubNavigation } from "~/components/SubNavigation/subnav";
import { prisma } from "~/utils/prisma.server";

const subPages = [
  {
    name: "Configure",
    to: ""
  },
  {
    name: "Expenses",
    to: "expenses"
  },
  {
    name: "General Savings",
    to: "savings"
  },
  {
    name: "Savings Goals",
    to: "savings-goals"
  },
]

export default function BudgetingLayout() {
  const renderedSubPages = subPages.map((page) => {
    let to = `/budgets/${page.to}`;
    if (page.name === "Configure") {
      to = "/budgets"
    }
    return <>
      <SubNavigation
        to={to}
        end={page.name === "Configure"}
        name={page.name}
      />
    </>
  })
  return <>
    <HeaderLayout
      title={<h1>Budgeting</h1>}
      subTitle={"Manage your budgets"}
      subPages={renderedSubPages}
    />
    <Outlet />
  </>
}