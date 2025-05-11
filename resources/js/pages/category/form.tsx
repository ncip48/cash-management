/* eslint-disable react-hooks/exhaustive-deps */
import { SelectInput } from '@/components/select';
import TextInput from '@/components/text-input';
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { PageProps } from '@/types';
import { CategoryType } from '@/types/category';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, SaveIcon, XCircleIcon } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

export function CategoryForm({ open, setOpen, item }: { open: boolean; setOpen: (open: boolean) => void; item: CategoryType | null }) {
    const { items: categories } = usePage<PageProps<{ items: CategoryType[] }>>().props;

    const isEdit = !!item;

    const { setData, patch, post, errors, processing, clearErrors } = useForm<{
        name: string;
        parent_id: null | string;
    }>({
        name: '',
        parent_id: '',
    });

    useEffect(() => {
        if (open && item) {
            setData('name', item.name);
            setData('parent_id', item.parent_id);
        }
    }, [open, item]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const action = isEdit ? patch : post;
        const url = isEdit ? route('category.update', item.id || '') : route('category.store');

        action(url, {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
        });
    };

    useEffect(() => {
        if (open) {
            clearErrors();
        }
    }, [open]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader className="text-center">
                    <AlertDialogTitle className="text-2xl">{isEdit ? 'Edit' : 'Add'} Category</AlertDialogTitle>
                </AlertDialogHeader>

                <div className="flex flex-col gap-4">
                    <TextInput
                        title="Name"
                        name="name"
                        defaultValue={isEdit ? item?.name || '' : ''}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        placeholder="Please input your category name"
                    />
                    <SelectInput
                        title="Type"
                        items={categories.filter((x) => !x.parent).map((category) => ({ label: category.name, value: category.id }))}
                        onChange={(val) => setData('parent_id', val)}
                        defaultValue={item?.parent_id || ''}
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
