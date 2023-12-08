import type { LinksFunction } from "@remix-run/node";
import styles from "./styles.module.css";
import { ReactNode } from "react";



export default function Button(props: {content:Iterable<ReactNode>}) {
    return (
        <button className={styles.Button}>{props.content}</button>
    )
}