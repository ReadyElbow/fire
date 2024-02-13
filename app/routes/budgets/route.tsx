import { mint } from "@radix-ui/colors";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { useState } from "react";
import { HeaderLayout } from "~/components/PageHeader/header";
import { SubNavigation } from "~/components/SubNavigation/subnav";
import { prisma } from "~/utils/prisma.server";

// I need to present options to the user that will restrict the data that is being presented
export async function loader({ params }: LoaderFunctionArgs) {
  const firstBudget = await prisma.budgetCategories.findFirst({
    orderBy: {
      date: "asc"
    },
    select: {
      date: true
    }
  });
  return json({ firstBudget: firstBudget })
}

export default function BudgetingLayout() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const params = useParams();

  const handleUpdate = (event) => {
    const [year, month] = event.target.value.split("-")
    navigate(`/budgets/${year}/${month}`);
  }

  const currentDate = new Date()
  const currentDateString = `${currentDate.getFullYear()}-${currentDate.getMonth().toString().padStart(2, "0")}`
  let selected;
  if (params.year && params.month) {
    selected = `${params.year}-${params.month}`
  }
  const firstBudgetDate = data.firstBudget?.date;
  let min;
  if (firstBudgetDate) {
    const date = new Date(firstBudgetDate);
    min = `${date.getFullYear()}-${date.getMonth().toFixed(2)}`
  } else {
    min = currentDateString
  }
  const subpages = [
    <input type="month" name="start" min={min} max={currentDateString} defaultValue={selected} onChange={handleUpdate} />
  ]

  return <>
    <HeaderLayout
      title={<h1>Budgeting</h1>}
      subTitle={"Manage your budgets"}
      subPages={subpages}
    />
    <Outlet />
  </>
}