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
  return <div className={style.Card} style={props.overwriteStyle}>
    {card}
  </div>
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
    {props.body && <div>{props.body}</div>}
    {props.footer && <div>{props.footer}</div>}
  </>
  return <Link to={props.to}>
    <div className={style.Card} style={props.overwriteStyle}>
      {card}
    </div>
  </Link>
}