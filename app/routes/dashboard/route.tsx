import { LoaderFunctionArgs, SerializeFrom, json } from "@remix-run/node"
import styles from "./styles.module.css"
import { fetchHighLevelAccountsDetails } from "~/utils/db_methods/accounts"
import { useLoaderData } from "@remix-run/react"
import { Prisma } from "@prisma/client"


type HighLevelAccounts = Prisma.PromiseReturnType<typeof fetchHighLevelAccountsDetails>


export async function loader(request: LoaderFunctionArgs) {
    const accounts = await fetchHighLevelAccountsDetails();
    const data = {
        accounts: accounts,
    };
    
    return json(data);
}

function AccountCards(props: {accounts:SerializeFrom<HighLevelAccounts>}) {
    const accountCards = props.accounts.map(account => {
        <div>
            <div className={styles.accountCardTitle}>
                <h1 className={styles.accountCardProvider}>
                    {account.provider} - {account.bankAccountType}
                </h1>
                <h1 className={styles.accountCardAccountDetails}>
                    {account.bankAccountNumber}
                </h1>
            </div>
            <div>
                <p className="accountCardBalance">
                    {account.balance}
                </p>
            </div>
            <div>
                <p className="accountCardLastUpdate">
                    {Date.now()}
                </p>
            </div>
        </div>
        }
    )
    return <>{accountCards}</>
}


export default function Dashboard() {
    const data = useLoaderData<typeof loader>()

    return <div className={styles.dashboardGrid}>
        <div className={styles.accounts}>
            <div className={styles.accountTitle}>
                <h1>Accounts</h1>
            </div>
            <div className={styles.accountCardSection}>
                {
                    data.accounts.length ? 
                    <AccountCards accounts={data.accounts}/> 
                    : <p>Test</p>
                }
            </div>
        </div>
        <div className="networkSummary"></div>
        <div className="monthlyMetrics"></div>
    </div>
}