"use client"

import * as React from "react"
import {
  CalendarClock,
  UsersRound,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavClient } from "./nav-client"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "History",
          url: "admin/home",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Events",
      url: "#",
      icon: CalendarClock,
      isActive: true,
      items: [
        {
          title: "Events",
          url: "/admin/events",
        },
        {
          title: "Formations",
          url: "/admin/formations",
        },
      ],
    },],
    navClient:[{
      title: "Clients",
      url: "#",
      icon: UsersRound,
    },],
    navSetting:[{
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Général",
          url: "#",
        },
        {
          title: "A propos",
          url: "#",
        },
        {
          title: "Adresses et contact",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarContent>
        <NavMain title="Dashboard" items={data.navMain} />
        <NavClient items={data.navClient} />
        <NavMain title="Reglage" items={data.navSetting} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
