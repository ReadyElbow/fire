import { NavLink } from "@remix-run/react";
import style from "./styles.module.css";
import * as Separator from '@radix-ui/react-separator';
import { Button } from "../Button";

export function SubNavigation( props: {end: boolean, to: string, name: string}) {
  return <>
    <NavLink
      to={props.to}
      end={props.end}
      className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "active" : ""
      }
    >
      {props.name}
    </NavLink>
    <Separator.Root className={style.subNavSeparate} orientation="vertical"  />
  </>
}

export function SubNavigationButton( props: { name: string}) {
  return <>
    <Button className={style.subNavButton}>
      {props.name}
    </Button>
    <Separator.Root className={style.subNavSeparate} orientation="vertical"  />
  </>
}