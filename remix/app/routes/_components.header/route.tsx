// app/routes/resources/customers.tsx
import { SignIn, SignUp, UserButton } from '@clerk/remix';
import { createClerkClient } from '@clerk/remix/api.server';
import { getAuth } from '@clerk/remix/ssr.server';
import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData, NavLink } from '@remix-run/react';
import styles from "./styles.module.css";
import Button from "~/components/Button";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDownIcon } from "@radix-ui/react-icons";
 
import { RecordSubMenu } from './subMenus';

export async function loader(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args);
  if (!userId) {
      return null
  }
  const user = await createClerkClient({secretKey: process.env.CLERK_SECRET_KEY}).users.getUser(userId);
  if (!user.privateMetadata.apiKeys) {
    return {}
  } else {
    for (const key of Object.keys(user.privateMetadata.apiKeys)) {
      user.privateMetadata.apiKeys[key] = "*********"
    }
    return user.privateMetadata.apiKeys
  }
}

type SubMenuProps = {
  subMenuItems: {
    "path": string
    "title": string
    "description": string
  }[]
}

function GenerateSubMenu(props: SubMenuProps){
  const subMenuItems = props.subMenuItems
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
        <NavLink
          to="/dashboard"
          className={styles.NavMenuTrigger}
        >
          Dashboard
        </NavLink>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger className={styles.NavMenuTrigger}>
          Learn <ChevronDownIcon className={styles.NavMenuChevron} aria-hidden />
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className={styles.NavMenuContent}>
          <GenerateSubMenu subMenuItems={RecordSubMenu} />
        </NavigationMenu.Content>
      </NavigationMenu.Item>

    </NavigationMenu.List>
    <div className={styles.ViewportPosition}>
        <NavigationMenu.Viewport className={styles.NavigationMenuViewport} />
      </div>
  </NavigationMenu.Root>
  )
}

type AuthComponent = {
  title: string
  component: React.JSX.Element
}
function RadixDialogBox(props:AuthComponent) {
  return (
      <Dialog.Root>
          <Dialog.Trigger />
              <Button title={props.title}></Button>
          <Dialog.Portal>
              <Dialog.Content>
                  {props.component}
              </Dialog.Content>
          </Dialog.Portal>
      </Dialog.Root> 
  )
}

export default function Navbar() {
  const userData = useLoaderData<typeof loader>();
  console.log(userData)
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1 className={styles.headerTitle}>FIRE</h1>
        <div>
            {
                userData ? 
                    <>
                        <Button title="Configure"/>
                        <UserButton signInUrl="/"></UserButton> 
                    </>
                    :
                    <>
                        <RadixDialogBox title="Sign In" component={<SignIn/>}></RadixDialogBox>
                        <RadixDialogBox title="Sign Up" component={<SignUp/>}></RadixDialogBox>
                    </>
            }
        </div>
      </div>
      {
        userData &&
        <div className={styles.headerNavbar}>
          <RadixNavigationMenu></RadixNavigationMenu>
        </div>}
    </header>
)} 