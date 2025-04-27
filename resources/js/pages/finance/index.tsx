import StatCard from '@/components/card/stat-card';
import Container from '@/components/container';
import { DataTable } from '@/components/data-table';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import { FinanceType } from '@/types/finance';
import { formatRupiah } from '@/utils/currecny';
import { useFlashToast } from '@/utils/flash';
import { makeToast } from '@/utils/toast';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PiggyBankIcon, TargetIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { useState } from 'react';
import { columns } from './columns';
import { CategoryForm } from './form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Finance',
        href: '/finance',
    },
];

function Page() {
    const { items } = usePage<PageProps<{ items: FinanceType[] }>>().props;

    useFlashToast();

    const { delete: destroy, processing } = useForm();

    const deleteAction = (id: string) => {
        destroy(route('finance.destroy', id), {
            preserveScroll: true,
            onSuccess: () => makeToast({ success: true, message: 'Success delete category' }),
            onError: () => makeToast({ success: false, message: 'Error delete category' }),
        });
    };

    const [modal, setModal] = useState<{ open: boolean; item: FinanceType | null }>({
        open: false,
        item: null,
    });

    const total = items.reduce((sum, item) => sum + (parseFloat(String(item.income)) || 0) - (parseFloat(String(item.outcome)) || 0), 0);
    const percentage = ((total / 30000000) * 100).toFixed(0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Finance" />
            <Container>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Pemasukan"
                        value={formatRupiah(items.reduce((sum, item) => sum + (parseFloat(String(item.income)) || 0), 0))}
                        icon={<TrendingUpIcon className="text-muted-foreground h-4 w-4" />}
                    />
                    <StatCard
                        title="Pengeluaran"
                        value={formatRupiah(items.reduce((sum, item) => sum + (parseFloat(String(item.outcome)) || 0), 0))}
                        icon={<TrendingDownIcon className="text-muted-foreground h-4 w-4" />}
                    />
                    <StatCard
                        title="Sisa Uang"
                        value={`${formatRupiah(total)} (${percentage}%)`}
                        icon={<PiggyBankIcon className="text-muted-foreground h-4 w-4" />}
                    />
                    <StatCard title="Target" value={formatRupiah(30000000)} icon={<TargetIcon className="text-muted-foreground h-4 w-4" />} />
                </div>
                <Card>
                    <CardContent>
                        <h2 className="text-xl font-bold">Finance</h2>
                        <DataTable
                            onAdd={() => setModal({ open: true, item: null })}
                            columns={columns}
                            data={items}
                            search="income"
                            onDelete={(id) => deleteAction(id)}
                            processingDelete={processing}
                            onEdit={(item) => setModal({ open: true, item })}
                        />
                    </CardContent>
                </Card>
            </Container>
            <CategoryForm open={modal.open} setOpen={(open) => setModal({ ...modal, open })} item={modal.item} />
        </AppLayout>
    );
}

export default Page;
