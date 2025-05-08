/* eslint-disable @typescript-eslint/no-explicit-any */
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
import React, { ReactNode, useRef } from 'react';

import { PlanItemType } from '@/types/plan';
import { formatRupiah } from '@/utils/currecny';
import { makeToast } from '@/utils/toast';
import { router, useForm } from '@inertiajs/react';
import EditableStatus from '../editable-status';
import EditableText from '../editable-text';
import { Input } from '../ui/input';

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
                    deleteFn={(id) => route('plan-item.destroy', id)}
                />
            );
        },
    },

    {
        accessorKey: 'is_realized',
        header: () => <div className="text-center">Done</div>,
        cell: ({ row }) => {
            return (
                <EditableStatus
                    id={row.original.id}
                    name="is_realized"
                    value={row.original.is_realized == 0 ? false : true}
                    routeFn={(id) => route('plan-item.update', id)} // adjust as needed
                />
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
    planId: string;
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

export function PlanCard<TData extends { id: string }, TValue>({ data, planId }: DataTableProps<TData>) {
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

    const inputRef = useRef<HTMLInputElement>(null);

    const {
        data: inputData,
        setData,
        post,
        processing,
        reset,
    } = useForm({
        name: '',
        plan_id: planId,
    });

    const handleSubmit = () => {
        try {
            if (inputData.name.trim() !== '') {
                post(route('plan-item.store'), {
                    preserveScroll: true,
                    onSuccess: () => {
                        reset();
                        router.reload({ only: ['items'] });
                        window.location.reload();
                    },
                    onError: () => {},
                });
            }
        } catch (error: any) {
            makeToast({ success: false, message: error.message });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ' && e.target instanceof HTMLInputElement) {
            e.stopPropagation();
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

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
                        <TableRow>
                            <TableCell colSpan={1}>
                                <Input
                                    ref={inputRef}
                                    value={inputData.name}
                                    onChange={(e) => {
                                        setData('name', e.target.value);
                                    }}
                                    onBlur={handleSubmit}
                                    onKeyDown={handleKeyDown}
                                    className="w-full"
                                    onClick={(e) => e.stopPropagation()}
                                    disabled={processing}
                                    placeholder="+ new item"
                                />
                            </TableCell>
                            <TableCell colSpan={4} className=""></TableCell>
                        </TableRow>
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
