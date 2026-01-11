import type { ReactNode } from "react"
import { redirect } from "next/navigation"

import { getUser } from "../lib/auth/getUser"
import type { WebUser } from "../access/roles"

import PortalSidebar from "../components/sidebar/PortalSidebar"
import PortalHeader from "../components/header/PortalHeader"
import PortalMobileNav from "../components/nav/PortalMobileNav"
import { SidebarProvider } from "../components/sidebar/useSidebarState"

export default async function AppLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = (await getUser()) as WebUser | null

  // 🔐 Auth gate (only for app routes)
  if (!user) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <div className="shell">
        <PortalSidebar user={user} />

        <main className="main">
          <PortalHeader user={user} />
          {children}
        </main>

        <PortalMobileNav />
      </div>
    </SidebarProvider>
  )
}
