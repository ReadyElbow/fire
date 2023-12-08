import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData, NavLink, useFetcher } from '@remix-run/react';
import styles from "./styles.module.css";
import Button from "~/components/Button";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDownIcon, UpdateIcon } from "@radix-ui/react-icons";
 
import { RecordSubMenu } from './subMenus';
import { useEffect, useState } from 'react';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({"apiKeys":{}})
  // const { userId } = await getAuth(args);
  // if (!userId) {
  //     return null
  // }
  // const user = await createClerkClient({secretKey: process.env.CLERK_SECRET_KEY}).users.getUser(userId);
  // if (!user.privateMetadata.apiKeys) {
  //   return {"apiKeys": {}}
  // } else {
  //   for (const key of Object.keys(user.privateMetadata.apiKeys)) {
  //     user.privateMetadata.apiKeys[key] = "*********"
  //   }
  //   return {
  //     "apiKeys": user.privateMetadata.apiKeys
  //   }
  // }
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
          <h4>Home</h4>
        </NavLink>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
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

export function Navbar() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  let userFetcher = useFetcher<typeof loader>();
  useEffect(() => {
    if (userFetcher.state === "idle" && userFetcher.data == null) {
      userFetcher.load("/header");
      setAuthenticated(true)
      setLoading(false)
    }
  }, [userFetcher]);
  // useEffect(() => {
  //   if (userFetcher.state === "idle" && userFetcher.data == null) {
  //     userFetcher.load("/header");
  //   }
  //   console.log(userFetcher)
  //   const userData = userFetcher.data?.apiKeys ?? null
  //   if (userData) {
  //     setAuthData({
  //       "authenticated": true,
  //       "apiKeys": "test"
  //     })
  //   }
  // }, [])
  let AuthBar = <>
    <RadixDialogBox title="Sign In" component={<>"hi"</>}></RadixDialogBox>
    <RadixDialogBox title="Sign Up" component={<>"hi"</>}></RadixDialogBox>
  </>
  if (isAuthenticated) {
    AuthBar = <>
      <Button title="Configure"/>
    </>
  }
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1 className={styles.headerTitle}>FIRE</h1>
        <div>
            {
              loading ?
                <UpdateIcon/>
                :
                AuthBar
              }
        </div>
      </div>
      {
        isAuthenticated  &&
        <div className={styles.headerNavbar}>
          <RadixNavigationMenu></RadixNavigationMenu>
        </div>}
    </header>
)} 