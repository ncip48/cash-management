/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/components/ui/input'; // adjust import path to your Input component
import { cn } from '@/lib/utils';
import { formatRupiah } from '@/utils/currecny';
import { makeToast } from '@/utils/toast';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

type EditableTextProps = {
    id: number | string;
    name: string; // the field name, like 'age', 'description', etc.
    value: string;
    isEditable?: boolean; // controls whether text is editable
    routeFn: (id: number | string) => string; // function that returns the route
    fullWidth?: boolean;
};

export default function EditableText({ id, name, value, isEditable = true, routeFn, fullWidth }: EditableTextProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    const { setData, patch, processing, errors } = useForm({
        [name]: value,
    });

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    const handleSubmit = () => {
        try {
            if (localValue.trim() !== value.trim()) {
                patch(routeFn(id), {
                    preserveScroll: true,
                    onSuccess: () => setIsEditing(false),
                    onError: () => setIsEditing(false),
                });
            } else {
                setIsEditing(false);
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
        } else if (e.key === 'Escape') {
            setLocalValue(value);
            setIsEditing(false);
        }
    };

    const widthClass = fullWidth ? 'w-full block' : 'w-fit inline-block';

    return (
        <>
            {isEditing ? (
                <Input
                    ref={inputRef}
                    value={localValue}
                    onChange={(e) => {
                        setLocalValue(e.target.value);
                        setData(name, e.target.value);
                    }}
                    onBlur={handleSubmit}
                    onKeyDown={handleKeyDown}
                    className="w-full"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                    disabled={processing}
                />
            ) : (
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        if (isEditable) {
                            setIsEditing(true);
                            setTimeout(() => inputRef.current?.focus(), 0);
                        }
                    }}
                    className={cn(
                        widthClass,
                        'hover:border-input hover:bg-muted',
                        !value ? 'h-[30px]' : '',
                        'hover:no-underline',
                        isEditable ? 'cursor-text' : 'cursor-not-allowed',
                        'rounded-sm border border-transparent px-2 py-1 transition',
                    )}
                >
                    {name == 'budget' ? formatRupiah(localValue) : localValue ? localValue : '-'}
                </span>
            )}
            {errors[name] && <div className="text-sm text-red-500">{errors[name]}</div>}
        </>
    );
}
