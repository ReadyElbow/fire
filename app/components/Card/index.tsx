import style from "./styles.module.css"

export function Card(props:{title:JSX.Element|undefined, body:JSX.Element, footer:JSX.Element}) {
    <div className={style.Card}>
        {
            props.title && <div className={style.CardTitle}>{props.title}<div/>
        }
        {
            props.title && 
                <>{props.title}<br/></>
        }
    </div>
}