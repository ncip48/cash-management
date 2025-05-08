import { User } from '.';

export type PlanType = {
    id: string;
    name: string;
    visibility: string;
    estimation_date: string;
    is_realized: number;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    created_by: string;
    updated_by: null;
    owner: User;
    shared_users: User[];
    items: PlanItemType[];
    is_mine: boolean;
};

export type PlanItemType = {
    id: string;
    plan_id: string;
    name: string;
    budget: string;
    description: null;
    is_realized: number;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    created_by: string;
    updated_by: null;
};
