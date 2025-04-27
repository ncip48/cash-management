/* eslint-disable react-hooks/exhaustive-deps */
import { SelectInput } from '@/components/select';
import TextInput from '@/components/text-input';
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { PageProps, User } from '@/types';
import { CategoryType } from '@/types/category';
import { FinanceType } from '@/types/finance';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, SaveIcon, XCircleIcon } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

export function CategoryForm({ open, setOpen, item }: { open: boolean; setOpen: (open: boolean) => void; item: FinanceType | null }) {
    const { categories, users, reasons } = usePage<PageProps<{ users: User[]; categories: CategoryType[]; reasons: CategoryType[] }>>().props;

    console.log(item);

    const isEdit = !!item;

    const { setData, patch, post, errors, processing, data, reset } = useForm<{
        date: string;
        amount: number;
        source_id: null | string;
        category_id: null | string;
        reason_id: null | string;
    }>({
        date: '',
        amount: 0,
        source_id: '',
        category_id: '',
        reason_id: null,
    });

    useEffect(() => {
        if (open && item) {
            setData('date', item.date);
            setData('amount', item.amount || 0);
            setData('source_id', item.source_id);
            if (item.category?.parent) {
                setData('category_id', item.category.parent_id);
            } else {
                setData('category_id', item.category_id);
            }
            setData('reason_id', item.category_id);
        }
    }, [open, item]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const action = isEdit ? patch : post;
        const url = isEdit ? route('finance.update', item.id || '') : route('finance.store');

        action(url, {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
        });
    };

    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent
            // className="sm:max-w-5xl"
            >
                <AlertDialogHeader className="text-center">
                    <AlertDialogTitle className="text-2xl">{isEdit ? 'Edit' : 'Add'} Keuangan</AlertDialogTitle>
                </AlertDialogHeader>

                <div className="flex flex-col gap-4">
                    <SelectInput
                        title="Kategori"
                        items={categories.map((category) => ({ label: category.name, value: category.id }))}
                        onChange={(val) => {
                            setData('category_id', val);
                            if (val !== '0f2d4232-22ae-11f0-844b-f72efd6b226a') {
                                setData('reason_id', null);
                            } else {
                                setData('reason_id', String(item?.reason_id));
                            }
                        }}
                        defaultValue={data?.category_id || ''}
                    />
                    {data.category_id === '0f2d4232-22ae-11f0-844b-f72efd6b226a' && (
                        <SelectInput
                            title="Kegunaan"
                            items={reasons.map((category) => ({ label: category.name, value: category.id }))}
                            onChange={(val) => setData('reason_id', val)}
                            defaultValue={data?.reason_id || ''}
                        />
                    )}
                    <TextInput
                        title="Tanggal"
                        name="date"
                        defaultValue={isEdit ? item?.date || '' : ''}
                        onChange={(e) => setData('date', e.target.value)}
                        error={errors.date}
                        type="date"
                    />
                    <TextInput
                        title="Jumlah"
                        name="amount"
                        defaultValue={isEdit ? item?.amount || '' : ''}
                        onChange={(e) => setData('amount', Number(e.target.value))}
                        error={errors.amount}
                        placeholder="Masukkan jumlah uang"
                    />
                    <SelectInput
                        title="Sumber Uang"
                        items={users.map((user) => ({ label: user.name, value: String(user.id) }))}
                        onChange={(val) => setData('source_id', val)}
                        defaultValue={item?.source_id || ''}
                    />
                </div>

                {/* Footer */}
                <AlertDialogFooter className="mt-2 flex flex-col gap-2">
                    <div className="flex w-full flex-col items-center justify-end gap-2 sm:flex-row">
                        <Button variant="destructive" className="w-full sm:w-auto" onClick={() => setOpen(false)}>
                            <XCircleIcon />
                            Cancel
                        </Button>

                        <Button className="w-full sm:w-auto" onClick={submit} disabled={processing}>
                            {processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <SaveIcon className="h-4 w-4" />}
                            Save
                        </Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
