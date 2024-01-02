import type { LinksFunction } from "@remix-run/node";
import styles from "./styles.module.css";
import { JSXElementConstructor, ReactNode } from "react";
import React from "react";



// export function Button(props: {content:string}) {
//     return (
//         <button >{props.content}</button>
//     )
// }


export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, ...props }, ref) => {
    let buttonClassName: string;
    
    if (variant === "secondary") {
      buttonClassName = styles.SecondaryButton;
    } else {
      buttonClassName = styles.Button;
    }

    return (
      <button className={buttonClassName} {...props} ref={ref}>
        {children}
      </button>
    );
  }
);

// export const Button1 = React.forwardRef<HTMLButtonElement>(
//   ({ children, ...props }, ref) => {
//     return (
//       <button className={styles.Button} {...props} ref={ref}>
//         {children}
//       </button>
//     );
//   }
// );

// export const Button = React.forwardRef(function MyInput(props, ref) {
//   return (
//     <label>
//       {props.label}
//       <input ref={ref} />
//     </label>
//   );
// });