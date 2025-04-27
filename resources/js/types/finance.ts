// resources/js/Types/FinanceType.ts

import { User } from '.';
import { CategoryType } from './category';

export type FinanceType = {
    id: string;
    date: string; // Format: YYYY-MM-DD
    amount: number | null;
    income: number | null;
    outcome: number | null;
    is_didik: boolean;
    is_suel: boolean;
    source_id: string;
    category_id: string | null;
    reason_id: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    created_by: User;
    updated_by: User;
    source?: User; // optional if eager loaded
    category?: CategoryType; // optional if eager loaded
};
