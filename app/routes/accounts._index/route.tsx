// Defining a view of all accounts that can then be selected from the page or even added
// Breaking it down into inactive accounts as well

import { Accounts, Prisma } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { InteractiveCard } from "~/components/Card";
import { mapBankLogo } from "~/utils/bankingLogos";
import { prisma } from "~/utils/prisma.server";
import style from "./styles.module.css";
import { AccountDialog } from "./create_account_dialog";
import { ZodError } from "zod";

export async function loader(request: LoaderFunctionArgs) {
    const accounts = await prisma.accounts.findMany()
    const data = {
        accounts: accounts,
    };
    return json(data);
}

// Need an action to handle creating a new account(post request)
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const bankAccountNumber = formData.get("bankAccountNumber");
  const bankAccountSortCode = formData.get("bankAccountSortCode");
  const bankAccountType = formData.get("bankAccountType");
  const provider = formData.get("provider");
  const interestRate = formData.get("interestRate");
  try {
    const response = await prisma.accounts.create({
      data: {
        bankAccountNumber: Number(bankAccountNumber),
        bankAccountSortCode: bankAccountSortCode as string,
        bankAccountType: bankAccountType as string,
        provider: provider as string,
        interestRate: Number(interestRate),
        balance: 0.00,
      },
    })
    return redirect(`/accounts/${response.id}`);
  } catch (e) {
    type TErrorMapping = {
      [key: string]: string
    }
    if (e instanceof ZodError) {
      let errorObject: TErrorMapping = {};
      for (const error of e.issues) {
        const key = error.path.join(".");
        errorObject[key] = error.message;
      }
      return json({ error: errorObject }, { status: 400 });
    } else if (e instanceof Prisma.PrismaClientValidationError) {
      return json({ error: {general: e.message} }, { status: 400 })
    } else {
      return json({ error: {general: "Something went wrong"} }, { status: 500 }); 
    }
  }
}


function AccountCard(props: {account: Accounts}) {
  const cardTitle = <div className={style.accountCardTitle}>{mapBankLogo(props.account.provider, 100)} <p>£{props.account.balance}</p></div>
  const cardBody = <div>
    <h4>{props.account.bankAccountType}</h4>
    <p>{props.account.bankAccountNumber}, {props.account.bankAccountSortCode}</p>
  </div>
  const cardFooter = <div><p>Last updated {Math.round((Date.now() - Date.parse(props.account.updatedAt))/ (24 * 60 * 60 * 1000))} days ago</p></div>
  return <InteractiveCard
    to={`/accounts/${props.account.id}`}
    title={cardTitle}
    body={cardBody}
    footer={cardFooter}
    overwriteStyle={{width: "250px", height: "175px"}}
  />
}



export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [ activeCards, inactiveCards ] = data.accounts.reduce((acc, account) => {
    if (account.active) {
      acc[0].push(<AccountCard account={account}/>)
    } else {
      acc[1].push(<AccountCard account={account}/>)
    }
    return acc
  }, [[],[]])

  return (
    <div>
        <h1>Active Accounts</h1>
        <br />
        <AccountDialog />
        <br />
        <div className={style.accounts}>
        {activeCards}
        </div>
        { 
          inactiveCards.length != 0 
          ?
          <>
            <h2>Inactive Accounts</h2>
            <div>
            {inactiveCards}
            </div> 
          </>
            : null}
      </div>
  );
}