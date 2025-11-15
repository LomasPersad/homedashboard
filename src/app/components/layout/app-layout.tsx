'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { SidebarNav, SidebarHeaderContent } from './sidebar-nav';
import { Header } from './header';
import { Button } from '@/components/ui/button';
import { LogOut, Settings } from 'lucide-react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="h-16 items-center border-b">
          <div className="flex items-center gap-2">
            <SidebarHeaderContent/>
            <div className="ml-auto">
              <SidebarTrigger className="max-md:hidden" />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip={{children: 'Settings', className: 'font-headline'}} className='group-data-[collapsible=icon]:justify-center'>
                    <Settings className="h-5 w-5" />
                    <span className="font-headline tracking-wide">Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
