import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { createClerkClient } from '@clerk/remix/api.server';
import { SignIn, SignUp, UserButton } from "@clerk/remix";
import Button from "../../../../remix/app/components/Button";
import styles from "./styles.module.css";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { NavLink, useFetcher, useLoaderData } from "@remix-run/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";


export async function loader(args: LoaderFunctionArgs) {
  debugger;
  const { userId } = await getAuth(args);
  if (!userId) {
      return null
  }
  const user = await createClerkClient({secretKey: process.env.CLERK_SECRET_KEY}).users.getUser(userId);
  console.log(user);
  return user
  // const user = await createClerkClient({secretKey: process.env.CLERK_SECRET_KEY}).users.getUser(userId);
  // return user
  // if (!user.privateMetadata.apiKeys) {
  //     return {}
  // } else {
  //     Object.keys(user.privateMetadata.apiKeys).forEach((apiKey) => {
  //         user.privateMetadata.apiKeys[apiKey] = "************"
  //     })
  // }
  // return userId;
}

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
        // userFetcher &&
        //     <div className={styles.headerNavbar}>
        //         <RadixNavigationMenu></RadixNavigationMenu>
        //     </div>
      }
    </header>
  )} 
  
  