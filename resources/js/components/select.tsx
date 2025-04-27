import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@radix-ui/react-dropdown-menu';

interface SelectInputProps {
    items: { label: string; value: string }[];
    placeholder?: string;
    label?: string;
    className?: string;
    onChange?: (value: string) => void;
    title: string;
    defaultValue?: string; // Added defaultValue
}

export function SelectInput({ title, items, placeholder = 'Select an option', label, className, onChange, defaultValue }: SelectInputProps) {
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
        </div>
    );
}
