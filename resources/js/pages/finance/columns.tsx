import { ExtendedColumnDef } from '@/types/column';
import { FinanceType } from '@/types/finance';
import { formatRupiah } from '@/utils/currecny';
import { formatDate } from '@/utils/date';
import { CheckCircle2Icon } from 'lucide-react';

export const columns: ExtendedColumnDef<FinanceType, FinanceType>[] = [
    {
        accessorKey: 'month',
        header: 'Bulan',
        cell: ({ row }) => {
            return formatDate(row.original.date, 'MMMM');
        },
    },
    {
        accessorKey: 'date',
        header: 'Tanggal',
        cell: ({ row }) => {
            return formatDate(row.original.date, 'DD MMMM YYYY');
        },
    },
    {
        accessorKey: 'income',
        header: 'Pemasukan',
        customClassName: 'bg-green-800 text-white',
        cell: ({ row }) => {
            return row.original.income ? formatRupiah(Number(row.original.income)) : '';
        },
    },
    {
        accessorKey: 'outcome',
        header: 'Pengeluaran',
        customClassName: 'bg-red-800 text-white',
        cell: ({ row }) => {
            return row.original.outcome ? formatRupiah(Number(row.original.outcome)) : '';
        },
    },
    {
        accessorKey: 'is_didik',
        header: () => <div className="text-center">Didik</div>,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center">
                    {row.original.is_didik ? <CheckCircle2Icon className="text-success h-5 w-5 text-center" /> : <></>}
                </div>
            );
        },
    },
    {
        accessorKey: 'is_suel',
        header: () => <div className="text-center">Suel</div>,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center">
                    {row.original.is_suel ? <CheckCircle2Icon className="text-success h-5 w-5 text-center" /> : <></>}
                </div>
            );
        },
    },
    {
        accessorKey: 'category',
        header: 'Keterangan',
        cell: ({ row }) => {
            return row.original.category ? row.original.category.name : '-';
        },
    },
    // {
    //     accessorKey: 'modified',
    //     header: 'Modified',
    //     cell: ({ row }) => {
    //         return formatDate(row.original.updated_at);
    //     },
    // },
    // {
    //     accessorKey: 'updated',
    //     header: 'Updated',
    //     cell: ({ row }) => {
    //         return row.original.updated_by ? row.original.updated_by.name : '-';
    //     },
    // },
];
