import { NavLink } from "@remix-run/react";
import style from "./subnav.module.css";
import * as Separator from '@radix-ui/react-separator';
import { Button, ButtonProps } from "../Button/button";
import React from "react";

export function SubNavigation(props: { end: boolean, to: string, name: string }) {
  return <>
    <NavLink
      to={props.to}
      end={props.end}
      className={({ isActive, isPending }) => {
        if (isPending) {
          return style.subNavLinkActive;
        } else if (isActive) {
          return style.subNavLinkActive
        }
        return style.subNavLink;
      }}
    >
      {props.name}
    </NavLink>
    <Separator.Root className={style.subNavSeparate} orientation="vertical" />
  </>
}

export const SubNavigationButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return <>
      <Button className={style.subNavButton} {...props} ref={ref}>
        {children}
      </Button>
      <Separator.Root className={style.subNavSeparate} orientation="vertical" />
    </>
  }
);