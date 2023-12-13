import style from "./styles.module.css"
import { Link } from "@remix-run/react"

export function Card(props:{title:JSX.Element|undefined, body:JSX.Element, footer:JSX.Element|undefined}) {
    return <div className={style.Card}>
        {
            props.title && <div className={style.CardTitle}>{props.title}</div>
        }
        {
            props.body && <div>{props.body}</div>
        }
        {
            props.footer && <div>{props.footer}</div>
        }
    </div>
}

export function InteractiveCard(props:{title:JSX.Element|undefined, body:JSX.Element, footer:JSX.Element|undefined, to:string}) {
    return <Link to={props.to}>
        <div className={style.InteractiveCard}>
            {
                props.title && <div className={style.CardTitle}>{props.title}</div>
            }
            {
                props.body && <div>{props.body}</div>
            }
            {
                props.footer && <div>{props.footer}</div>
            }
        </div>
    </Link>
}