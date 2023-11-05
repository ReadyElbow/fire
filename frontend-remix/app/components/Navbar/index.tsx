import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDownIcon } from "@radix-ui/react-icons";
import styles from "./styles.module.css";
import Button from "../Button";
import { RecordSubMenu, TSubMenu } from './menuDetails';
import { NavLink } from "@remix-run/react";


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
    <NavigationMenu.Root className={styles.NavigationMenuRoot}>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Item one</NavigationMenu.Trigger>
          <NavigationMenu.Content className={styles.NavigationMenuContent}>
            Item one content
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Item two</NavigationMenu.Trigger>
          <NavigationMenu.Content className={styles.NavigationMenuContent}>
            Item 2
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <div className={styles.ViewportPosition}>
        <NavigationMenu.Viewport className={styles.NavigationMenuViewport} />
      </div>
    </NavigationMenu.Root>
    // <NavigationMenu.Root className={styles.NavMenuRoot}>
    //   <NavigationMenu.List className={styles.NavMenuList}>
    //     <NavigationMenu.Item>
    //       <NavigationMenu.Trigger className={styles.NavMenuTrigger} >
    //         Github <ChevronDownIcon className={styles.NavMenuChevron}></ChevronDownIcon>
    //       </NavigationMenu.Trigger>
    //       <NavigationMenu.Content className={styles.NavMenuContent}>
    //         <GenerateSubMenu items={RecordSubMenu}/>
    //       </NavigationMenu.Content>
    //     </NavigationMenu.Item>
    //     <NavigationMenu.Item>
    //       <NavigationMenu.Link className={styles.NavMenuTrigger}>
    //         Github
    //       </NavigationMenu.Link>
    //     </NavigationMenu.Item>

    //   </NavigationMenu.List>
    //   <div className={styles.ViewportPosition}>
    //     <NavigationMenu.Viewport className={styles.NavigationMenuViewport}/>
    //   </div>
    // </NavigationMenu.Root>
  )
}

export default function Navbar() {
  return (
  <header className={styles.header}>
      <div>
        <h1>Fire 🔥</h1>
      </div>
      <div>
        < RadixNavigationMenu />
      </div>
      <div>
        <Button title="Test"/>
      </div>
  </header>
)} 

