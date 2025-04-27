import { User } from '.';

export type CategoryType = {
    id: string;
    name: string;
    parent_id: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    created_by: User;
    updated_by: User;
    parent?: CategoryType | null; // Parent category (optional, if loaded)
    children?: CategoryType[]; // Children categories (optional, if loaded)
};
