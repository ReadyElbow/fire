import { LoaderFunctionArgs, SerializeFrom, json } from "@remix-run/node"
import styles from "./styles.module.css"
import cardStyles from "~/styles/Card/styles.module.css"
import { fetchHighLevelAccountsDetails } from "~/utils/db_methods/accounts"
import { Link, useLoaderData } from "@remix-run/react"
import { Accounts, Prisma } from "@prisma/client"
import { monthlySummaryByAccount } from "~/utils/db_methods/transactions"
import { NetworthSummaryGraph } from "./networthSummary"
import { NivoContainer } from "~/components/NivoContainer"


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
    return <Link to={`/accounts/${props.account.id}`} key={props.account.id}>
            <div className={cardStyles.InteractiveCard}>
                <div className={cardStyles.CardTitle}>
                    <h4>
                        {props.account.provider}
                    </h4>
                    <p className={styles.accountCardAccountDetails}>
                        {props.account.bankAccountNumber}, {props.account.bankAccountSortCode}
                    </p>
                <br />
                </div>
                <div>
                    <h2>
                        £{props.account.balance}
                    </h2>
                <br />
                </div>
                <div>
                    <p>
                        Last updated {Math.round((Date.now() - Date.parse(props.account.updatedAt))/ (24 * 60 * 60 * 1000))} days ago
                    </p>
                </div>
            </div>
        </Link>
    // accountCards.push(
    //     <Link to={`/accounts/add`}>
    //         <div className={cardStyles.InteractiveCard} style={{padding: "3rem"}}>
    //             <PlusIcon width={20} height={20}/>
    //         </div>
    //     </Link>
    // )
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