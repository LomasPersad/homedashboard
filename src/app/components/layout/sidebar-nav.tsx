'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, CheckSquare, Image as ImageIcon, LayoutDashboard, Home } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { FamilyHubLogo } from '../icons';

const links = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/photos', label: 'Photos', icon: ImageIcon },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <Link href={link.href} legacyBehavior passHref>
            <SidebarMenuButton
              asChild
              isActive={pathname === link.href}
              className={cn(
                'group-data-[collapsible=icon]:justify-center'
              )}
              tooltip={{
                children: link.label,
                className: 'font-headline',
              }}
            >
              <a>
                <link.icon className="h-5 w-5" />
                <span className="font-headline tracking-wide">{link.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function SidebarHeaderContent() {
    return (
        <div className="flex items-center gap-2">
            <FamilyHubLogo className="h-8 w-8 text-primary" />
            <span className="font-headline text-lg font-semibold tracking-wider text-foreground">
              Family Hub
            </span>
        </div>
    )
}
