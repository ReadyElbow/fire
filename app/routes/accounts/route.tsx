import { Outlet } from "@remix-run/react";

export default function AccountsLayout() {
    
    return <div className="pageHeadings">
        <Outlet/>
    </div>
}