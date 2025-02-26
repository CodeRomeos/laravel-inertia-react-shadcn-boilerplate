import * as React from "react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table";
import {
    ArrowUpDown,
    ChevronDown,
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight,
    FileDown,
    MoreHorizontal,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { formatDate } from "date-fns";
import { Link, router } from "@inertiajs/react";
import { Label } from "@/shadcn/ui/label";

export default function RTable({
    data,
    columns,
    searchColumns,
    exportable = false,
    filename = "export",
    paginationLinks = null,
    meta = null,
}) {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const csvConfig = mkConfig({
        fieldSeparator: ",",
        filename: formatDate(new Date(), "yyyyMMdd") + "_" + filename,
        decimalSeparator: ".",
        useKeysAsHeaders: true,
    });

    // export function
    const exportExcel = (rows) => {
        const rowData = rows.map((row) => row.original);
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    return (
        <div className="">
            <div className="flex items-center gap-x-4 py-4">
                {searchColumns.map((c) => (
                    <Input
                        key={`searchColumn-${c}`}
                        placeholder={`Filter by ${c.replace("_", " ")}...`}
                        value={
                            table.getAllColumns().find((co) => co.id === c)
                                ? table.getColumn(c).getFilterValue()
                                : ""
                        }
                        onChange={(event) =>
                            table.getAllColumns().find((co) => co.id == c)
                                ? table
                                      .getColumn(c)
                                      ?.setFilterValue(event.target.value)
                                : null
                        }
                        className="max-w-sm"
                    />
                ))}
                {exportable === true && (
                    <Button
                        className="flex gap-x-2"
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                            exportExcel(table.getFilteredRowModel().rows)
                        }
                    >
                        <FileDown size={16} />
                        Export
                    </Button>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                {meta && (
                    <>
                        <div className="text-muted-foreground text-sm">
                            {meta.from} to {meta.to} of {meta.total}
                        </div>
                        <div>
                            <Select
                                value={`${meta.per_page}`}
                                onValueChange={(p) => {
                                    router.get(meta.path, { limit: p });
                                }}
                            >
                                <SelectTrigger className="w-full h-9">
                                    <SelectValue placeholder="Per Page" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {[5, 10, 25, 50, 100, 150, 200].map(
                                            (v) => (
                                                <SelectItem
                                                    key={v}
                                                    value={`${v}`}
                                                >
                                                    Per Page {v}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                )}
                {paginationLinks && (
                    <div className="space-x-2 flex">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!paginationLinks.first}
                            asChild
                        >
                            <Link
                                disabled={!paginationLinks.first}
                                href={paginationLinks.first}
                            >
                                <ChevronFirst size={20} />
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!paginationLinks.prev}
                            asChild
                        >
                            <Link
                                disabled={!paginationLinks.prev}
                                href={paginationLinks.prev}
                            >
                                <ChevronLeft size={20} />
                            </Link>
                        </Button>
                        {meta && (
                            <div className="border rounded-md w-10 flex justify-center items-center text-sm">
                                {meta.current_page}
                            </div>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!paginationLinks.next}
                            asChild
                        >
                            <Link
                                disabled={!paginationLinks.next}
                                href={paginationLinks.next}
                            >
                                <ChevronRight size={20} />
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!paginationLinks.next}
                            asChild
                        >
                            <Link
                                disabled={!paginationLinks.last}
                                href={paginationLinks.last}
                            >
                                <ChevronLast size={20} />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
