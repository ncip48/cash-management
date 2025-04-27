import Container from '@/components/container';
import { DataTable } from '@/components/data-table';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import { CategoryType } from '@/types/category';
import { useFlashToast } from '@/utils/flash';
import { makeToast } from '@/utils/toast';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { columns } from './columns';
import { CategoryForm } from './form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/category',
    },
];

function Page() {
    const { items } = usePage<PageProps<{ items: CategoryType[] }>>().props;

    useFlashToast();

    const { delete: destroy, processing } = useForm();

    const deleteAction = (id: string) => {
        destroy(route('category.destroy', id), {
            preserveScroll: true,
            onSuccess: () => makeToast({ success: true, message: 'Success delete category' }),
            onError: () => makeToast({ success: false, message: 'Error delete category' }),
        });
    };

    const [modal, setModal] = useState<{ open: boolean; item: CategoryType | null }>({
        open: false,
        item: null,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            <Container>
                <Card>
                    <CardContent>
                        <h2 className="text-xl font-bold">Category</h2>
                        <DataTable
                            prohibittedAction={[0, 1]}
                            prohibittedMessage={`You are not allowed to edit this category`}
                            onAdd={() => setModal({ open: true, item: null })}
                            columns={columns}
                            data={items}
                            search="name"
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
