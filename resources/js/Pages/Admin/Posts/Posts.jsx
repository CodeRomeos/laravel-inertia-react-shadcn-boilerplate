import { Button } from "@/shadcn/ui/button";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowUpDown,
    Eye,
    // ChevronDown,
    MoreHorizontal,
    Pencil,
    PlusCircle,
} from "lucide-react";
import { Checkbox } from "@/shadcn/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
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
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "slug",
        header: "Slug",
    },
    {
        accessorKey: "crated_at_string",
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
            const payment = row.original;

            return (
                <div className="flex justify-end items-center gap-2">
                    {row.original.status == 1 && (
                        <Button asChild size="icon">
                            <Link
                                href={route("page", row.original.slug)}
                                target="_blank"
                            >
                                <Eye className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}

                    <Can permit="edit pages">
                        <Button asChild variant="outline" size="icon">
                            <Link
                                href={route(
                                    "admin.posts.edit",
                                    row.original.id
                                )}
                            >
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </Button>
                    </Can>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(payment.id)
                                }
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View page</DropdownMenuItem>
                            <DropdownMenuItem>
                                View payment details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

export default function Posts({ posts }) {
    return (
        <AuthenticatedLayout>
            <Head>
                <title>Posts</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Posts ({posts.meta.total})
                        </PageHeading.Title>

                        <PageHeading.Actions>
                            <Can permit="export pages">
                                <Button variant="outline">Export</Button>
                            </Can>
                            <Can permit="create pages">
                                <Button asChild>
                                    <Link href={route("admin.posts.create")}>
                                        <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                        Create New
                                    </Link>
                                </Button>
                            </Can>
                        </PageHeading.Actions>
                    </PageHeading>
                    <div className="grid gap-4 grid-cols-1">
                        <RTable
                            data={posts.data}
                            columns={columns}
                            searchColumns={["name"]}
                            // exportable
                            paginationLinks={posts.links}
                            meta={posts.meta}
                        />
                    </div>
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
