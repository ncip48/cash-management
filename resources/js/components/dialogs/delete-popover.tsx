import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React from 'react';

export function DeletePopover({ children, onClick }: { children: React.ReactNode; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
    const [open, setOpen] = React.useState(false);

    const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick(e);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Are you sure?</h3>
                    <p className="text-muted-foreground text-sm">Data will be permanently deleted and cannot be recovered.</p>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleConfirm}>
                        Yes
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
