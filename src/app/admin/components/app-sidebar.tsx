"use client"

import * as React from "react"
import {
  CalendarClock,
  UsersRound,
  Settings2,
  Mail,
} from "lucide-react"

import { NavMain } from "@/app/admin/components/nav-main"
import { NavUser } from "@/app/admin/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavClient } from "./nav-client"

// This is sample data.
const data = {
  user: {
    name: "aymen",
    email: "aymentigui@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    // {
    //   title: "Playground",
    //   url: "#",
    //   icon: SquareTerminal,
    //   items: [
    //     {
    //       title: "History",
    //       url: "admin/home",
    //     },
    //     {
    //       title: "Starred",
    //       url: "#",
    //     },
    //     {
    //       title: "Settings",
    //       url: "#",
    //     },
    //   ],
    // },
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
      url: "/admin/clients",
      icon: UsersRound,
    },],
    navMessage:[{
      title: "Messages",
      url: "/admin/messages",
      icon: Mail,
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
        <NavClient items={data.navMessage} />
        <NavMain title="Reglage" items={data.navSetting} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
