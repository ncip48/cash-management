'use client';

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    HeaderContext,
    useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { ReactNode } from 'react';

import { PlanItemType } from '@/types/plan';
import { formatRupiah } from '@/utils/currecny';
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import EditableText from '../editable-text';

const columns: ExtendedColumnDef<PlanItemType, PlanItemType>[] = [
    {
        accessorKey: 'name',
        header: 'Item',
        cell: ({ row }) => {
            return (
                <EditableText
                    name="name"
                    value={row.original.name}
                    isEditable={true}
                    id={row.original.id}
                    routeFn={(id) => route('plan-item.update', id)}
                    fullWidth
                />
            );
        },
    },

    {
        accessorKey: 'is_realized',
        header: () => <div className="text-center">Done</div>,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center">
                    {row.original.is_realized ? (
                        <CheckCircle2Icon className="text-success h-5 w-5 text-center" />
                    ) : (
                        <XCircleIcon className="h-5 w-5 text-center text-red-800" />
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
            return (
                <EditableText
                    name="description"
                    value={row.original.description || ''}
                    isEditable={true}
                    id={row.original.id}
                    routeFn={(id) => route('plan-item.update', id)}
                    fullWidth
                />
            );
        },
    },
    {
        accessorKey: 'budget',
        header: 'Budget',
        cell: ({ row }) => {
            return (
                <EditableText
                    name="budget"
                    value={row.original.budget}
                    isEditable={true}
                    id={row.original.id}
                    routeFn={(id) => route('plan-item.update', id)}
                    fullWidth
                />
            );
        },
    },
];

// Extend the ColumnDef interface to include the 'childs' and 'accessorKey' properties
interface ExtendedColumnDef<TData, TValue> extends Omit<ColumnDef<TData, TValue>, 'childs'> {
    accessorKey: string;
    childs?: ExtendedColumnDef<TData, TValue>[];
    customClassName?: string;
}

interface DataTableProps<TData extends { id: string }> {
    data: PlanItemType[];
    onAdd?: () => void;
    onDelete?: (id: string) => void;
    onEdit?: (data: TData) => void;
    add?: boolean;
    edit?: boolean;
    leftAction?: (item: TData) => React.ReactNode;
    processingDelete?: boolean;
    prohibittedAction?: number[];
    prohibittedMessage?: string;
}

export function PlanCard<TData extends { id: string }, TValue>({ data }: DataTableProps<TData>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: data as never,
        columns: columns as ColumnDef<TData, TValue>[],
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    });

    return (
        <div>
            <div className="overflow-x-auto rounded-md border sm:overflow-visible">
                <Table className="min-w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => {
                                    const columnDef = header.column.columnDef as ExtendedColumnDef<TData, TValue>;
                                    if (columnDef.childs) {
                                        return (
                                            <TableHead key={header.id} colSpan={columnDef.childs.length} className="border">
                                                {flexRender(columnDef.header, header.getContext() as HeaderContext<TData, TValue>)}
                                            </TableHead>
                                        );
                                    } else {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                rowSpan={2}
                                                className={`${index + 1 !== headerGroup.headers.length ? 'border-r' : ''}${columnDef.customClassName ?? ''}`}
                                            >
                                                {typeof columnDef.header === 'function'
                                                    ? columnDef.header(header.getContext() as HeaderContext<TData, TValue>)
                                                    : columnDef.header}
                                            </TableHead>
                                        );
                                    }
                                })}
                            </TableRow>
                        ))}

                        {/* Render child headers */}
                        <TableRow>
                            {columns
                                .filter((column) => column.childs)
                                .flatMap((column) =>
                                    column.childs!.map((child) => (
                                        <TableHead key={child.accessorKey} className="border text-center">
                                            {child.header as ReactNode}
                                        </TableHead>
                                    )),
                                )}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {/* Render cells */}
                                    {columns.map((column) => {
                                        if (column.childs) {
                                            return column.childs.map((child) => {
                                                const cell = row.getAllCells().find((c) => c.column.id === child.accessorKey);
                                                return (
                                                    <TableCell key={`${column.accessorKey}-${child.accessorKey}`} className="border">
                                                        {cell ? flexRender(cell.column.columnDef.cell, cell.getContext()) : null}
                                                    </TableCell>
                                                );
                                            });
                                        } else {
                                            const cell = row.getAllCells().find((c) => c.column.id === column.accessorKey);
                                            return (
                                                <TableCell key={column.accessorKey} className={`border ${column.customClassName ?? ''}`}>
                                                    {cell ? flexRender(cell.column.columnDef.cell, cell.getContext()) : null}
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + 5} // Adjust for index and action columns
                                    className="h-24 text-center"
                                >
                                    No data available.
                                </TableCell>
                            </TableRow>
                        )}
                        {data?.length ? (
                            <TableRow>
                                <TableCell colSpan={3} className="border-r text-right">
                                    Total
                                </TableCell>
                                <TableCell colSpan={2}>{formatRupiah(data.reduce((acc, row) => acc + parseFloat(row.budget), 0))}</TableCell>
                            </TableRow>
                        ) : (
                            <></>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
