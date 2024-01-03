import { BankLogo } from "~/utils/bankingLogos";
import headerStyle from "./pageHeader.module.css"


export function HeaderLayout(props: { subPages?: JSX.Element[], title: JSX.Element, subTitle: string }) {
  return <div className={headerStyle.container}>
    <div className={headerStyle.pageTitle}>
      {props.title}
    </div>
    <br />
    <h3 className="backgroundText">{props.subTitle}</h3>
    {
      props.subPages &&
      <div className={headerStyle.subPages}>
        {props.subPages}
      </div>
    }
  </div>
}