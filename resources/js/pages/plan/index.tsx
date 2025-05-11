import { PlanCard } from '@/components/card/plan-card';
import Container from '@/components/container';
import { DeleteDialog } from '@/components/dialogs/delete-dialog';
import EditableText from '@/components/editable-text';
import { CustomTooltip } from '@/components/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import { PlanType } from '@/types/plan';
import { useFlashToast } from '@/utils/flash';
import { makeToast } from '@/utils/toast';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ArchiveIcon, GlobeIcon, LockIcon, PlusCircleIcon, Users2Icon } from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { PlanForm } from './form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Plan',
        href: '/plan',
    },
];

function Page() {
    const { items } = usePage<PageProps<{ items: PlanType[] }>>().props;

    useFlashToast();

    const [modal, setModal] = useState<{ open: boolean; item: PlanType | null }>({
        open: false,
        item: null,
    });

    const [openItems, setOpenItems] = useState<string[]>(items.map((item) => `item-${item.id}`));

    useEffect(() => {
        setOpenItems(items.map((item) => `item-${item.id}`));
    }, [items]);

    const { delete: destroy } = useForm();

    const deleteAction = (id: string) => {
        destroy(route('plan.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
                makeToast({ success: true, message: 'Success' });
            },
            onError: () => makeToast({ success: false, message: 'Error' }),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Plan" />
            <Container>
                <div className="flex items-center justify-between gap-2 py-4">
                    <h2 className="text-xl font-bold">Plan</h2>

                    <div className="flex gap-2">
                        <Button size="sm" variant={'secondary'} onClick={() => {}} className="cursor-pointer">
                            <ArchiveIcon />
                            Archived Plan
                        </Button>
                        <Button size="sm" onClick={() => setModal({ item: null, open: true })} className="cursor-pointer">
                            <PlusCircleIcon />
                            Add Plan
                        </Button>
                    </div>
                </div>
                <Accordion type="multiple" className="w-full space-y-4" value={openItems} onValueChange={setOpenItems}>
                    {items.map((item) => {
                        return (
                            <AccordionItem key={item.id} value={`item-${item.id}`} className="rounded-md border px-4 last:border">
                                <AccordionTrigger
                                    onKeyDown={(e) => {
                                        if (e.key === ' ') {
                                            e.preventDefault(); // Prevent space from toggling the accordion
                                        }
                                    }}
                                    onClick={(e) => {
                                        const ls = localStorage.getItem('s');
                                        if (ls === item.id) {
                                            e.preventDefault(); // Prevent space from toggling the accordion
                                        }
                                    }}
                                    type="reset"
                                    className="items-center hover:no-underline"
                                >
                                    <div className="flex w-full items-center justify-between space-x-4">
                                        <div className="flex items-center gap-2">
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (item.is_mine) {
                                                        setModal({ open: true, item });
                                                    }
                                                }}
                                            >
                                                {item.visibility == 'shared_all' ? (
                                                    <CustomTooltip content="Shared plan">
                                                        <GlobeIcon className="h-4 w-4" />
                                                    </CustomTooltip>
                                                ) : item.visibility == 'shared_users' ? (
                                                    <CustomTooltip content="Restricted shared plan">
                                                        <Users2Icon className="h-4 w-4" />
                                                    </CustomTooltip>
                                                ) : (
                                                    <CustomTooltip content="Private plan">
                                                        <LockIcon className="h-4 w-4" />
                                                    </CustomTooltip>
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <EditableText
                                                    name="name"
                                                    value={item.name}
                                                    isEditable={item.is_mine}
                                                    id={item.id}
                                                    routeFn={(id) => route('plan.update', id)}
                                                />
                                                {item.estimation_date && (
                                                    <span
                                                        className={`pl-2 text-xs ${!moment(item.estimation_date).isAfter(moment()) ? 'text-destructive' : 'text-green-800'}`}
                                                    >
                                                        {moment(item.estimation_date).format('DD MMMM YYYY')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {item.is_mine && (
                                                <div className="flex gap-2">
                                                    <DeleteDialog
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteAction(String(item.id));
                                                        }}
                                                    >
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            <ArchiveIcon className="h-1 w-2" />
                                                        </Button>
                                                    </DeleteDialog>
                                                </div>
                                            )}
                                            <Badge>{item.items.length} items</Badge>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <PlanCard key={item.id} data={item.items} planId={item.id} />
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </Container>
            <PlanForm open={modal.open} setOpen={(open) => setModal({ ...modal, open })} item={modal.item} />
        </AppLayout>
    );
}

export default Page;
