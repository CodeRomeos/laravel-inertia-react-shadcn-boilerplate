import { Button } from "@/shadcn/ui/button";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Eye,
    Pencil,
    PlusCircle,
} from "lucide-react";
import { Checkbox } from "@/shadcn/ui/checkbox";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/shadcn/ui/tooltip";
import RTable from "@/Components/RTable";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import PageHeading from "@/Components/PageHeading";
import DeletePostDialog from "@/Components/Posts/DeletePostDialog";
import DeletePermanentalyPostDialog from "@/Components/Posts/DeletePermanentalyPostDialog";
import RestorePostDialog from "@/Components/Posts/RestorePostDialog";
import Can from "@/Components/Can";
import { CopyIcon } from "@radix-ui/react-icons";
import { Badge } from "@/shadcn/ui/badge";

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
        accessorKey: "categories.name",
        header: "Categories",
        cell: ({ row }) => row.original.categories.map((c) => c.name).join(", "),
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
                    {row.original.status == 1 && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button asChild size="icon">
                                        <a
                                            href={route(
                                                "blog.post",
                                                row.original.slug
                                            )}
                                            target="_blank"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>View</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}

                    <Can permit="create posts">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="icon"
                                    >
                                        <Link
                                            href={route("admin.posts.create")}
                                            data={{
                                                copyPost: JSON.stringify({
                                                    title: row.original.title,
                                                    slug: row.original.slug,
                                                    short_description:
                                                        row.original
                                                            .short_description,
                                                    body: row.original.body,
                                                    meta_title:
                                                        row.original.meta_title,
                                                    meta_description:
                                                        row.original
                                                            .meta_description,
                                                }),
                                            }}
                                        >
                                            <CopyIcon size="16" />
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Copy</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Can>
                    <Can permit="edit posts">
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
                </div>
            );
        },
    },
];

export default function Posts({
    posts,
    totalPostCount,
    totalTrashedPostCount,
}) {
    const blogBaseUrl = usePage().props.blogBaseUrl;

    const columns = [
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
            accessorKey: "id",
            header: "ID",
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
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) =>
                row.original.deleted_at ? (
                    <Badge variant="destructive">Trashed</Badge>
                ) : row.original.status == 1 ? (
                    <Badge variant="success">Published</Badge>
                ) : (
                    <Badge variant="outline">Draft</Badge>
                ),
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
                const post = row.original;
                return (
                    <div className="flex justify-end items-center gap-2">
                        {post.deleted_at == null && (
                            <>
                                {post.status == 1 && (
                                    <Button asChild size="icon">
                                        <a
                                            href={blogBaseUrl + "/" + post.slug}
                                            target="_blank"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </a>
                                    </Button>
                                )}
                                <Can permit="edit posts">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="icon"
                                    >
                                        <Link
                                            href={route(
                                                "admin.posts.edit",
                                                post.id
                                            )}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </Can>
                                <DeletePostDialog post={post} />
                            </>
                        )}
                        {post.deleted_at && (
                            <>
                                <DeletePermanentalyPostDialog
                                    post={post}
                                />
                                <RestorePostDialog post={post} />
                            </>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Posts</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <div className="bg-gray-100 flex gap-2 p-2">
                        <Button
                            asChild
                            variant={
                                route().current() == "admin.posts.index"
                                    ? "default"
                                    : "outline"
                            }
                        >
                            <Link href={route("admin.posts.index")}>
                                All ({totalPostCount})
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant={
                                route().current() == "admin.posts.trashed"
                                    ? "default"
                                    : "outline"
                            }
                        >
                            <Link href={route("admin.posts.trashed")}>
                                Trashed ({totalTrashedPostCount})
                            </Link>
                        </Button>
                    </div>
                    <PageHeading>
                        <PageHeading.Title>
                            Posts ({posts.meta.total})
                        </PageHeading.Title>

                        <PageHeading.Actions>
                            {/* <Can permit="export posts">
                                <Button variant="outline">Export</Button>
                            </Can> */}
                            <Can permit="create posts">
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