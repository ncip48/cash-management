import { makeToast } from '@/utils/toast';
import { router } from '@inertiajs/react';
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type EditableStatusProps = {
    id: number | string;
    name: string; // e.g., 'is_realized'
    value: boolean;
    routeFn: (id: number | string) => string;
};

export default function EditableStatus({ id, name, value, routeFn }: EditableStatusProps) {
    const [localValue, setLocalValue] = useState(value);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        setLocalValue(value); // sync when props change
    }, [value]);

    const handleToggle = () => {
        const newValue = !localValue;
        setLocalValue(newValue); // optimistic update
        setProcessing(true);

        router.patch(
            routeFn(id),
            {
                [name]: newValue,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    makeToast({ success: true, message: 'Status updated' });
                },
                onError: () => {
                    setLocalValue(value); // revert if failed
                    makeToast({ success: false, message: 'Failed to update status' });
                },
                onFinish: () => {
                    setProcessing(false);
                },
            },
        );
    };

    return (
        <div className="flex items-center justify-center">
            {localValue ? (
                <CheckCircle2Icon
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!processing) handleToggle();
                    }}
                    className="text-success h-5 w-5 cursor-pointer text-center transition hover:opacity-80"
                />
            ) : (
                <XCircleIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!processing) handleToggle();
                    }}
                    className="h-5 w-5 cursor-pointer text-center text-red-800 transition hover:opacity-80"
                />
            )}
        </div>
    );
}
