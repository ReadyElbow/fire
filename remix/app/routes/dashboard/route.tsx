import { LoaderFunctionArgs } from "@remix-run/node"
import styles from "./styles.module.css"
import { AppType } from "~/../../../api/src/index"
import { hc } from "hono/client"
import { cli } from "@remix-run/dev"

const client = hc<AppType>('http://localhost:6000/')

export async function loader(request: LoaderFunctionArgs) {
}

export default function Dashboard() {
    return <div className="dashboardGrid">
        <div className="accounts">
            <div className="accountTitle"></div>
            <div className="accountCards"></div>
        </div>
        <div className="networkSummary"></div>
        <div className="monthlyMetrics"></div>
    </div>
}