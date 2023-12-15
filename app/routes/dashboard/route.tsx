import { LoaderFunctionArgs, SerializeFrom, json } from "@remix-run/node"
import styles from "./styles.module.css"
import cardStyles from "~/styles/Card/styles.module.css"
import { fetchHighLevelAccountsDetails } from "~/utils/db_methods/accounts"
import { Link, useLoaderData } from "@remix-run/react"
import { Accounts, Prisma } from "@prisma/client"
import { monthlySummaryByAccount } from "~/utils/db_methods/transactions"
import { NetworthSummaryGraph } from "./networthSummary"
import { NivoContainer } from "~/components/NivoContainer"
import { Card, InteractiveCard } from "~/components/Card"
import { Lloyds_Banking } from "public/Banking Logos"
type HighLevelAccounts = Prisma.PromiseReturnType<typeof fetchHighLevelAccountsDetails>


export async function loader(request: LoaderFunctionArgs) {
    const accounts = await fetchHighLevelAccountsDetails();
    const monthlySummary = await monthlySummaryByAccount();
    const data = {
        accounts: accounts,
        monthlySummary: monthlySummary
    };
    return json(data);
}

function AccountsBreakdown(props: {accounts:SerializeFrom<HighLevelAccounts>}) {
    type TAccountTypeBreakdown = {
        [key: string]: JSX.Element[]
    }
    let accountTypeBreakdown:TAccountTypeBreakdown = {}
    for (const account of props.accounts) {
        console.log(account)
        if (accountTypeBreakdown[account.bankAccountType]) {
            accountTypeBreakdown[account.bankAccountType].push(<AccountCard account={account}/>)
        } else {
            accountTypeBreakdown[account.bankAccountType] = [<AccountCard account={account}/>]
        }
    }
    return <>
        {Object.entries(accountTypeBreakdown).map(([key,value]) => {
            return <div key={key}>
                <h2>{key}</h2>
                <div className={styles.accountCardSection}>
                    {value}
                </div>
            </div>
        })}
    </>
}

function AccountCard(props: {account:any}) {
    const title = <>
        {/* <h4>{props.account.provider}</h4> */}
        <img src={Lloyds_Banking} alt="" />
        <p className={styles.accountCardAccountDetails}>
            {props.account.bankAccountNumber}, {props.account.bankAccountSortCode}
        </p>
    </>
    const body  = <>
        <h2>£{props.account.balance}</h2>
    </>
    const footer = <>
        <p>Last updated {Math.round((Date.now() - Date.parse(props.account.updatedAt))/ (24 * 60 * 60 * 1000))} days ago</p>
    </>
    return <InteractiveCard title={title} body={body} footer={footer} to={`/accounts/${props.account.id}`}/>
}




export default function Dashboard() {
    const data = useLoaderData<typeof loader>();
    return <div className={styles.dashboardGrid}>
        <div className={styles.accounts}>
            <div className={styles.accountTitle}>
                <h1>Accounts</h1>
            </div>
            {
                data.accounts.length ? 
                <AccountsBreakdown accounts={data.accounts}/> 
                : <p>Test</p>
            }
        </div>
        <NivoContainer classStyle={styles.networthContent}>
            <h1>Networth Summary</h1>
            <NetworthSummaryGraph summaryData={data.monthlySummary}></NetworthSummaryGraph>
        </NivoContainer>
        <div className="monthlyMetrics"></div>
        
    </div>
}