import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { BankLogo } from "~/utils/bankingLogos";
import { prisma } from "~/utils/prisma.server";
import { SubNavigation } from "~/components/SubNavigation/subnav";
import headerStyle from "~/styles/pageHeader.module.css"
import { HeaderLayout } from "~/components/PageHeader/header";

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
    name: "Transactions",
    to: "/transactions"
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
      <SubNavigation
        to={to}
        end={page.name === "Back" || page.name === "Overview"}
        name={page.name}
      />
    </>
  })

  return <>
      <HeaderLayout
        title={<div style={{ display: "flex", alignItems: "center", gap: "0.2rem", height: "3em"}}><BankLogo provider={data.account.provider} height="90%" /><h1>{data.account.provider.split(" ")[0]}</h1></div>}
        subTitle={`${data.account.bankAccountNumber}, ${data.account.bankAccountSortCode}`}
        subPages={renderedSubPages}
      />
      <Outlet />
    </>;
}