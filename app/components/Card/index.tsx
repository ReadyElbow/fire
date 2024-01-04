import style from "./card.module.css"
import { Link } from "@remix-run/react"

export function Card(props: {
    title?: JSX.Element,
    body: JSX.Element,
    footer?: JSX.Element,
    overwriteStyle?: object
}) {
    const card = <>
        {props.title && <div>{props.title}</div>}
        {props.body && <div>{props.body}</div>}
        {props.footer && <div>{props.footer}</div>}
    </>
    if (props.overwriteStyle) {
        return <div className={style.Card} style={props.overwriteStyle}>{card}</div>
    } else {
        return <div className={style.Card}>{card}</div>
    }
}

export function InteractiveCard(props: {
    title?: JSX.Element,
    body: JSX.Element,
    footer?: JSX.Element,
    to: string,
    overwriteStyle?: object
}) {
    const card = <>
        {props.title && <div>{props.title}</div>}
        {props.body && props.body}
        {props.footer && props.footer}
    </>
    if (props.overwriteStyle) {
        return (
            <div className={style.Card} style={props.overwriteStyle}>
                <Link to={props.to}>
                    <div className={style.CardContent}>
                        {card}
                    </div>
                </Link>
            </div>
        )
    } else {
        return (
            <div className={style.Card}>
                <Link to={props.to}>
                    <div className={style.CardContent}>
                        {card}
                    </div>
                </Link>
            </div>
        )
    }
}