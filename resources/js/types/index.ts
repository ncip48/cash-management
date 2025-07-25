import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
    }[];
}

export interface SharedData {
    googleApiKey: string;
    apiUrl: string;
    wsUrl: string;
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type PageProps<T> = {
    googleApiKey: string;
    apiUrl: string;
    wsUrl: string;
    auth: {
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
    flash: {
        success?: string;
        error?: string;
    };
} & T;
