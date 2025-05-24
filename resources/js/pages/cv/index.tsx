import Container from '@/components/container';
import CvGrid from '@/components/grid/cv-grid';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import { CategoryType } from '@/types/category';
import { CVType } from '@/types/cv';
import { useFlashToast } from '@/utils/flash';
import { makeToast } from '@/utils/toast';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'CV',
        href: '/cv',
    },
];

function Page() {
    const { items } = usePage<PageProps<{ items: CVType[] }>>().props;

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
                <div className="py-4">
                    <h2 className="pb-6 text-xl font-bold">My CV</h2>
                    <CvGrid items={items} />
                </div>
            </Container>
            {/* <CategoryForm open={modal.open} setOpen={(open) => setModal({ ...modal, open })} item={modal.item} /> */}
        </AppLayout>
    );
}

export default Page;
