import type { LinksFunction } from "@remix-run/node"; 
import blueColors from "@radix-ui/colors/blue.css"
import styles from "./styles.module.css";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: blueColors }
  ]

 
interface ButtonProps {
    title: string
}

export default function Button(props: ButtonProps) {
    return (
        <button className={styles.Button}>{props.title}</button>
    )
}