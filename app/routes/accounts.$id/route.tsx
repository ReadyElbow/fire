import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { mapBankLogo } from "~/utils/bankingLogos";
import { prisma } from "~/utils/prisma.server";
import pageStyle from "~/styles/page_overview.css"
import * as Separator from '@radix-ui/react-separator';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: pageStyle },
];

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const account = await prisma.accounts.findFirst({
      where: {
        id: Number(params.id)
      }
    })
    return { account: account };
  } catch (e) {
    console.log(e)
    return { account: null };
  }
} 


const subPages = [
    {
        name: "Overview",
        to: ""
    },
    {
        name: "Back",
        to: "overwritten"
    },
    {
        name: "Add Transactions",
        to: "/add_transactions"
    },

]

export default function AccountLayout() {
  const data = useLoaderData<typeof loader>();
  if (!data.account) {
    return <h1>Account not found</h1>
  }

  const renderedSubPages = subPages.map((page) => {
    let to = `/accounts/${data.account?.id}${page.to}`
    if (page.name === "Back") {
        to = "/accounts"
    }
    return <>
        <NavLink
            to={to}
            end={page.name === "Back"}
            className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
            }
        >
            {page.name}
        </NavLink>
        <Separator.Root className="SeparatorRoot" orientation="vertical"  />
    </>
  })

  return (
    <>
      <div className="pageHeadings">
        <h2>{mapBankLogo(data.account.provider, 200)}</h2>
        <h3 className="backgroundText">{data.account.bankAccountNumber}, {data.account.bankAccountSortCode}</h3>
        <div className="subPages">
            {renderedSubPages}
        </div>
      </div>
      <Outlet />
    </>
  );
}