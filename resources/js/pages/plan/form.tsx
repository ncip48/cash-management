/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import MultipleSelector, { Option } from '@/components/multi-select';
import { SelectInput } from '@/components/select';
import TextInput from '@/components/text-input';
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { PageProps, User } from '@/types';
import { PlanType } from '@/types/plan';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, SaveIcon, XCircleIcon } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

const OPTIONS = [
    {
        label: 'Private',
        value: 'private',
    },
    {
        label: 'Share to all users',
        value: 'shared_all',
    },
    {
        label: 'Share to specific users',
        value: 'shared_users',
    },
];

export function PlanForm({ open, setOpen, item }: { open: boolean; setOpen: (open: boolean) => void; item: PlanType | null }) {
    const { users } = usePage<PageProps<{ users: User[] }>>().props;

    const isEdit = !!item;

    const { setData, patch, reset, data, post, errors, processing, clearErrors } = useForm<{
        name: string;
        estimation_date: null | string;
        visibility: null | string;
        shared_users: Option[];
        shared_user_ids: string[];
    }>({
        name: '',
        estimation_date: null,
        visibility: 'private',
        shared_users: [],
        shared_user_ids: [],
    });

    useEffect(() => {
        if (open && item) {
            setData('name', item.name);
            setData('visibility', item.visibility);
            setData('estimation_date', item.estimation_date);
            setData(
                'shared_users',
                item.shared_users.map((user) => ({ label: user.name, value: user.id })),
            );
        }
    }, [open, item]);

    useEffect(() => {
        setData(
            'shared_user_ids',
            data.shared_users.map((user) => user.value),
        );
    }, [data.shared_users]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const action = isEdit ? patch : post;
        const url = isEdit ? route('plan.update', item.id || '') : route('plan.store');

        action(url, {
            replace: true,
            preserveScroll: true,
            onSuccess: () => setOpen(false),
        });
    };

    useEffect(() => {
        if (open) {
            clearErrors();
        }
        if (!open) reset();
    }, [open]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader className="text-center">
                    <AlertDialogTitle className="text-2xl">{isEdit ? 'Edit Visibility' : 'Add Plan'}</AlertDialogTitle>
                </AlertDialogHeader>

                <div className="flex flex-col gap-4">
                    {!isEdit && (
                        <>
                            <TextInput
                                title="Name"
                                name="name"
                                defaultValue={isEdit ? data?.name || '' : ''}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                placeholder="Please input your plan name"
                            />
                            <TextInput
                                title="Estimation Date"
                                name="estimation_date"
                                defaultValue={isEdit ? data?.estimation_date || '' : ''}
                                onChange={(e) => setData('estimation_date', e.target.value)}
                                error={errors.estimation_date}
                                type="date"
                            />
                        </>
                    )}
                    <SelectInput
                        title="Visibility"
                        items={OPTIONS}
                        onChange={(val) => setData('visibility', val)}
                        defaultValue={item?.visibility || 'private'}
                        error={errors.visibility}
                    />
                    {data.visibility === 'shared_users' && (
                        <MultipleSelector
                            options={users.map((user) => ({ label: user.name, value: user.id }))}
                            onChange={(val) => {
                                setData('shared_users', val);
                            }}
                            value={data?.shared_users}
                            placeholder={'Select users'}
                            error={errors.shared_user_ids}
                        />
                    )}
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
