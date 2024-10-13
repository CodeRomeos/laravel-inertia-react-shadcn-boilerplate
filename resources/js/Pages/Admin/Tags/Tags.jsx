import { Button } from "@/shadcn/ui/button";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head, Link } from "@inertiajs/react";
import { Pencil, PlusCircle } from "lucide-react";
import { Checkbox } from "@/shadcn/ui/checkbox";
import RTable from "@/Components/RTable";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import PageHeading from "@/Components/PageHeading";
import Can from "@/Components/Can";

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "created_at_string",
        header: "Created At",
    },
    {
        accessorKey: "updated_at_string",
        header: "Updated At",
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <div className="flex justify-end items-center gap-2">
                    <Can permit="edit Tags">
                        <Button asChild variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Can>
                </div>
            );
        },
    },
];

export default function tags({ tags }) {
    return (
        <AuthenticatedLayout>
            <Head>
                <title>Tags</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Tags ({tags.meta.total})
                        </PageHeading.Title>

                        <PageHeading.Actions>
                            <Can permit="create tags">
                                <Button asChild>Create New</Button>
                            </Can>
                        </PageHeading.Actions>
                    </PageHeading>
                    <div className="grid gap-4 grid-cols-1">
                        <RTable
                            data={tags.data}
                            columns={columns}
                            searchColumns={["name"]}
                            // exportable
                            paginationLinks={tags.links}
                            meta={tags.meta}
                        />
                    </div>
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
