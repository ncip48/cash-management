import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookHeart, HandCoins, LayoutGrid, Lock, SquareMenu } from 'lucide-react';
import moment from 'moment';
import AppLogo from './app-logo';

const planStartDate = moment('2025-05-07');
const oneWeekLater = moment(planStartDate).add(7, 'days');
const today = moment();

const isNew = today.isBetween(planStartDate, oneWeekLater, null, '[]'); // inclusive

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    // {
    //     title: 'Product',
    //     url: '/product',
    //     icon: Package,
    // },
    {
        title: 'Category',
        url: '/category',
        icon: SquareMenu,
    },
    {
        title: 'Finance',
        url: '/finance',
        icon: HandCoins,
    },
    {
        title: `Plan ${isNew ? '[New]' : ''}`,
        url: '/plan',
        icon: BookHeart,
    },
    {
        title: 'Role & Permission',
        url: '/role-permission',
        icon: Lock,
        items: [
            {
                title: 'Permissions',
                url: '/role-permission/permissions',
            },
            {
                title: 'Roles',
                url: '/role-permission/roles',
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
