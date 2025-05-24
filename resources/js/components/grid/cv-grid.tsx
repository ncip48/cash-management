// components/CvGrid.tsx
import { Card, CardContent } from '@/components/ui/card';
import { CVType } from '@/types/cv';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const CvGrid = ({ items }: { items: CVType[] }) => {
    console.log(items);
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {/* Add New CV Card */}
            <Card className="flex h-[calc(12rem+2.5rem)] cursor-pointer items-center justify-center border-2 border-dashed transition hover:shadow-lg">
                <CardContent className="text-muted-foreground flex flex-col items-center justify-center">
                    <Plus className="mb-2 h-8 w-8" />
                    <span>Create new CV</span>
                </CardContent>
            </Card>

            {/* Existing CVs */}
            {items.map((item) => (
                <Link key={item.id} href={`/cv/${String(item.id)}/print`}>
                    <Card className="cursor-pointer gap-1 p-0 transition hover:shadow-lg">
                        <img src={`/img/cv/preview/${item.template.preview}`} alt={item.name} className="h-48 w-full rounded-t-lg object-cover" />
                        <CardContent className="truncate p-2 text-sm">{item.name}</CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export default CvGrid;
