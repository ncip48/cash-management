import { PlanCard } from '@/components/card/plan-card';
import Container from '@/components/container';
import EditableText from '@/components/editable-text';
import { CustomTooltip } from '@/components/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import { CategoryType } from '@/types/category';
import { PlanType } from '@/types/plan';
import { useFlashToast } from '@/utils/flash';
import { Head, usePage } from '@inertiajs/react';
import { GlobeIcon, LockIcon, SettingsIcon, Trash2Icon, Users2Icon } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { CategoryForm } from './form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Plan',
        href: '/plan',
    },
];

function Page() {
    const { items } = usePage<PageProps<{ items: PlanType[] }>>().props;

    useFlashToast();

    const [modal, setModal] = useState<{ open: boolean; item: CategoryType | null }>({
        open: false,
        item: null,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            <Container>
                <Accordion type="multiple" className="w-full space-y-4 py-4" defaultValue={items.map((_, index) => `item-${index}`)}>
                    {items.map((item, index) => {
                        return (
                            <AccordionItem key={index} value={`item-${index}`} className="rounded-md border px-4 last:border">
                                <AccordionTrigger
                                    onKeyDown={(e) => {
                                        if (e.key === ' ') {
                                            e.preventDefault(); // Prevent space from toggling the accordion
                                        }
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent space from toggling the accordion
                                    }}
                                    type="reset"
                                    className="items-center hover:no-underline"
                                >
                                    <div className="flex w-full items-center justify-between space-x-4">
                                        <div className="flex items-center gap-2">
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
                                                    <Button variant="outline" size="sm">
                                                        <SettingsIcon className="h-1 w-2" />
                                                    </Button>
                                                    <Button variant="destructive" size="sm">
                                                        <Trash2Icon className="h-1 w-2" />
                                                    </Button>
                                                </div>
                                            )}
                                            <Badge>{item.items.length} items</Badge>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <PlanCard key={index} onAdd={() => setModal({ open: true, item: null })} data={item.items} planId={item.id} />
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </Container>
            <CategoryForm open={modal.open} setOpen={(open) => setModal({ ...modal, open })} item={modal.item} />
        </AppLayout>
    );
}

export default Page;
