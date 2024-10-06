import { Button } from "@/shadcn/ui/button";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head, Link } from "@inertiajs/react";
import {
    Pencil,
    PlusCircle,
} from "lucide-react";
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
        accessorKey: "slug",
        header: "Slug",
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
                    <Can permit="edit post categories">
                        <Button asChild variant="outline" size="icon">
                            <Link
                                href={route(
                                    "admin.postCategories.edit",
                                    row.original.id
                                )}
                            >
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </Button>
                    </Can>
                </div>
            );
        },
    },
];

export default function PostCategories({ postCategories }) {
    return (
        <AuthenticatedLayout>
            <Head>
                <title>Post Categories</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Post Categories ({postCategories.meta.total})
                        </PageHeading.Title>

                        <PageHeading.Actions>
                            <Can permit="create post categories">
                                <Button asChild>
                                    <Link
                                        href={route(
                                            "admin.postCategories.create"
                                        )}
                                    >
                                        <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                        Create New
                                    </Link>
                                </Button>
                            </Can>
                        </PageHeading.Actions>
                    </PageHeading>
                    <div className="grid gap-4 grid-cols-1">
                        <RTable
                            data={postCategories.data}
                            columns={columns}
                            searchColumns={["name", "slug"]}
                            // exportable
                            paginationLinks={postCategories.links}
                            meta={postCategories.meta}
                        />
                    </div>
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
