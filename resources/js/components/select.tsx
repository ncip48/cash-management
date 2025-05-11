import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@radix-ui/react-dropdown-menu';
import InputError from './input-error';

interface SelectInputProps {
    items: { label: string; value: string }[];
    placeholder?: string;
    label?: string;
    className?: string;
    onChange?: (value: string) => void;
    title: string;
    defaultValue?: string; // Added defaultValue
    error?: string;
}

export function SelectInput({ title, error, items, placeholder = 'Select an option', label, className, onChange, defaultValue }: SelectInputProps) {
    return (
        <div>
            <Label>{title}</Label>
            <Select onValueChange={(value) => onChange?.(value)} defaultValue={defaultValue}>
                <SelectTrigger className={className}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {label && <SelectLabel>{label}</SelectLabel>}
                        {items.map((item, index) => (
                            <SelectItem key={index} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {error && <InputError className="mt-1" message={error} />}
        </div>
    );
}
