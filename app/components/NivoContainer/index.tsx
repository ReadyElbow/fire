import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export function NivoContainer(props: {children: Iterable<ReactNode>, classStyle: string})  { 
    return <div className={props.classStyle} style={{ position: "relative" }}>
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
            {props.children}
        </div>
    </div>
}