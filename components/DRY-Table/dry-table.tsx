"use client";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CustomSkeleton } from "@/components/ui/skeleton";
import { TableNotFound } from "@/components/ui/table/table-notFound";
import { useQueryParams } from "@/hooks/use-query-params";
import {
    ChevronDownIcon,
    ChevronsUpDownIcon,
    ChevronUpIcon,
} from "lucide-react";
import { JSX } from "react";
import { cn } from "@/lib/utils";

interface DRYTableProps<T> {
    headerColumn: {
        label: string;
        key: string | null;
    }[];
    tableData: T | undefined;
    loading: boolean;
    children: React.ReactNode;
}

export function DRYTable<T>({
    headerColumn,
    tableData,
    children,
    loading = false,
}: DRYTableProps<T>): JSX.Element {
    const { getParams, applyFilters } = useQueryParams();
    const sort_column = getParams("sort_column") || "employee_id";
    const sort_order = getParams("sort_order") || "desc";

    return (
        <Table className="w-full  text-left overflow-x-auto">
            <TableHeader className="bg-gradient-to-r from-blue-950 to-blue-900 text-lg text-white border-b border-gray-200">
                <TableRow className="hover:bg-blue-950">
                    {headerColumn.map((col) => (
                        <TableHead
                            key={col.label}
                            onClick={
                                col.key
                                    ? () =>
                                        applyFilters({
                                            sort_column: col.key,
                                            sort_order:
                                                sort_column === col.key && sort_order === "asc"
                                                    ? "desc"
                                                    : "asc",
                                        })
                                    : undefined
                            }
                            className={cn(
                                "px-3 py-3 select-none text-gray-100",
                                col.key && "cursor-pointer hover:text-blue-200 hover:bg-white/10"
                            )}
                        >
                            <div className="flex items-center gap-1.5">
                                <span>{col.label}</span>
                                {col.key && (
                                    <span
                                        className="flex items-center transition-transform duration-200 hover:scale-110"
                                        title={`Sort by ${col.label}`}
                                    >
                                        {sort_column !== col.key ? (
                                            <ChevronsUpDownIcon className="w-4 h-4 text-gray-300" />
                                        ) : sort_order === "asc" ? (
                                            <ChevronUpIcon className="w-4 h-4 text-blue-200" />
                                        ) : (
                                            <ChevronDownIcon className="w-4 h-4 text-blue-200" />
                                        )}
                                    </span>
                                )}
                            </div>
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            {loading ? (
                <CustomSkeleton columns={headerColumn.length} row={5} height={40} />
            ) : Array.isArray(tableData) && tableData.length === 0 ? (
                <TableNotFound colSpan={headerColumn.length} />
            ) : (
                children
            )}
        </Table>
    );
}