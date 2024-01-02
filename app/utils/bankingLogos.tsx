
import { ColumnSpacingIcon } from "@radix-ui/react-icons"
import { accountProviders } from "./providers"

export function mapBankLogo(provider:string, width?:number) {
    if (!width) {
        width = 100
    }
    console.log(provider)
    console.log(accountProviders)
    if (Object.keys(accountProviders).includes(provider)) {
        return <img src={accountProviders[provider]} alt="" width={width}/>
    } else {
        return <h4>{provider}</h4>
    }

}