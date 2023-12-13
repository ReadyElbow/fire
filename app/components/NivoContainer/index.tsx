import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export function NivoContainer(props: {children: Iterable<ReactNode>, classStyle: string})  { 
    return <div className={props.classStyle} style={{ position: "relative" }}>
        <div style={{ position: "absolute", width: "98%", height: "90%" }}>
            {props.children}
        </div>
    </div>
}