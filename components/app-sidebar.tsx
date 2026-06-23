"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { House, UsersRound,BriefcaseBusiness, ChartPie, Folder} from "lucide-react"
import Logo from "./landing/Logo"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Tableau de bord",
      url: "/dashboard",
      icon: (
        <House
        />
      ),
    },
    {
      title: "Candidatures",
      url: "/candidates",
      icon: (
        <UsersRound
        />
      ),
    },
    {
      title: "Jobs",
      url: "#",
      icon: (
        <BriefcaseBusiness
        />
      ),
    },
    // {
    //   title: "Mailbox",
    //   url: "#",
    //   icon: (
    //     <ChartPie
    //     />
    //   ),
    // },
    {
      title: "Rapports",
      url: "#",
      icon: (
        <ChartPie
        />
      ),
    },
    {
      title: "Vivier de Talent",
      url: "#",
      icon: (
        <Folder
        />
      ),
    },
  ],
  // navClouds: [
  //   {
  //     title: "Capture",
  //     icon: (
  //       <CameraIcon
  //       />
  //     ),
  //     isActive: true,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Proposal",
  //     icon: (
  //       <FileTextIcon
  //       />
  //     ),
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Prompts",
  //     icon: (
  //       <FileTextIcon
  //       />
  //     ),
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: (
  //       <Settings2Icon
  //       />
  //     ),
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: (
  //       <CircleHelpIcon
  //       />
  //     ),
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: (
  //       <SearchIcon
  //       />
  //     ),
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              
                
                <Logo />
              
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      {/* <SidebarFooter> */}
        {/* <NavUser user={data.user} /> */}
      {/* </SidebarFooter> */}
    </Sidebar>
  )
}
