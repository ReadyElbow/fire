import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDownIcon } from "@radix-ui/react-icons";
import styles from "./styles.module.css";
import Button from "../../../../remix/app/components/Button";
import { RecordSubMenu, TSubMenu } from './menuDetails';
import { NavLink } from "@remix-run/react";
import { useFetcher } from '@remix-run/react';

function GenerateSubMenu(props: TSubMenu){
  const subMenuItems = props.items
  return (
      <div className={styles.NavSubMenu}>
          {subMenuItems.map((menuItem) => {
            return <NavigationMenu.Link asChild key={menuItem.title}>
              <NavLink
                to={menuItem.path}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <div className={styles.SubMenuItemTitle}>{menuItem.title}</div>
                <div className={styles.SubMenuItemDescription}>{menuItem.description}</div>
              </NavLink>
            </NavigationMenu.Link>
          })}
      </div>
  )
}

const RadixNavigationMenu = () => {
  return (
  <NavigationMenu.Root className={styles.navMenuRoot}>
    <NavigationMenu.List className={styles.navMenuList}>
      <NavigationMenu.Item>
        <NavLink
          to="/"
          className={styles.NavMenuTrigger}
        >
          Home
        </NavLink>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger className={styles.NavMenuTrigger}>
          Learn <ChevronDownIcon className={styles.NavMenuChevron} aria-hidden />
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className={styles.NavMenuContent}>
          <GenerateSubMenu items={RecordSubMenu} />
        </NavigationMenu.Content>
      </NavigationMenu.Item>

    </NavigationMenu.List>
    <div className={styles.ViewportPosition}>
        <NavigationMenu.Viewport className={styles.NavigationMenuViewport} />
      </div>
  </NavigationMenu.Root>
  )
}

export default function Navbar() {
  return (
  <header className={styles.header}>
    <div className={styles.headerTop}>
      <h1 className={styles.headerTitle}>FIRE</h1>
      <div>
          <Button title="Configure"/>
      </div>
    </div>
    <div className={styles.headerNavbar}>
      <RadixNavigationMenu></RadixNavigationMenu>
    </div>
  </header>
)} 

