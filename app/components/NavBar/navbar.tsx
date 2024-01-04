import { NavLink, Outlet } from "@remix-run/react"
import navbarStyle from "./navbar.module.css"
const navbarPages = [
  {
    name: "Home",
    to: "/"
  },
  {
    name: "Dashboard",
    to: "/dashboard"
  },
  {
    name: "Accounts",
    to: "/accounts"
  },
  {
    name: "Budgeting",
    to: "/budgets/expenses"
  },
  {
    name: "Personal Configuration",
    to: "/configure"
  }
]

function NavBar() {
  return <div className={navbarStyle.navbarContainer}>
    <h1 className={navbarStyle.navbarHeader}>FIRE</h1>
    <ul className={navbarStyle.navbarList}>
      {navbarPages.map((page) => {
        return <li key={page.name} className={navbarStyle.navbarListElement}>
          <NavLink
            to={page.to}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            {page.name}
          </NavLink>
        </li>
      })}
    </ul>
  </div>
}

export default function MainLayout() {
  return <div className={navbarStyle.pageBreakdown}>
    <NavBar />
    <div className={navbarStyle.pageContent}>
      <Outlet />
    </div>
  </div>
}