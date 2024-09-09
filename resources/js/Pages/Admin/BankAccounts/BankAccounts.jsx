import { Button } from "@/shadcn/ui/button";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowUpDown,
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
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "balance",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Balance
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("balance")}</div>
        ),
    },
    {
        accessorKey: "bank_name",
        header: "Bank Name",
    },
    {
        accessorKey: "account_number",
        header: "Account Number",
    },
    {
        accessorKey: "branch",
        header: "Branch",
    },
    {
        accessorKey: "ifsc",
        header: "IFSC",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <div className="text-right">
                    <Can permit="edit bank accounts">
                    <Button asChild variant="outline" size="icon">
                        <Link
                            href={route("admin.bankAccounts.edit", row.original.id)}
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
                            <DropdownMenuItem>View client</DropdownMenuItem>
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

export default function BankAccounts({ bankAccounts }) {
    return (
        <AuthenticatedLayout>
            <Head>
                <title>Bank Accounts</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Bank Accounts ({bankAccounts.meta.total})
                        </PageHeading.Title>
                        <PageHeading.Actions>
                            <Can permit="export bank accounts">
                                <Button variant="outline">Export</Button>
                            </Can>
                            <Can permit="create bank accounts">
                                <Button asChild>
                                    <Link href={route("admin.bankAccounts.create")}>
                                        <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                        Create New
                                    </Link>
                                </Button>
                            </Can>
                        </PageHeading.Actions>
                    </PageHeading>
                    <div className="grid gap-4 grid-cols-1">
                        <RTable
                            data={bankAccounts.data}
                            columns={columns}
                            searchColumns={["name"]}
                            paginationLinks={bankAccounts.links}
                            meta={bankAccounts.meta}
                        />
                    </div>
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
