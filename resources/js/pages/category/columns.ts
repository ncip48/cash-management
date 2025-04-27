import { CategoryType } from '@/types/category';
import { ExtendedColumnDef } from '@/types/column';
import { formatDate } from '@/utils/date';

export const columns: ExtendedColumnDef<CategoryType, CategoryType>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'parent',
        header: 'Parent',
        cell: ({ row }) => {
            return row.original.parent ? row.original.parent.name : '-';
        },
    },
    {
        accessorKey: 'modified',
        header: 'Modified',
        cell: ({ row }) => {
            return formatDate(row.original.updated_at);
        },
    },
    {
        accessorKey: 'updated',
        header: 'Updated',
        cell: ({ row }) => {
            return row.original.updated_by ? row.original.updated_by.name : '-';
        },
    },
];
