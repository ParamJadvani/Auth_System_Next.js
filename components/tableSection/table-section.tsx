"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SkeletonTable } from "@/components/tableSection/table-skeleton";
import { TableNotFound } from "@/components/ui/table/table-notFound";
import { TableSort } from "@/components/tableSection/table-sort";
import { useQueryParams } from "@/hooks/use-query-params";
import React from "react";


type DataItem = { id: number | string;[key: string]: any };

export interface ColumnDefinition<T extends DataItem> {
    header: string;
    sortKey?: string | null;
    width: string;
    cell: (item: T) => React.ReactNode;
}


interface DynamicTableProps<T extends DataItem> {
    data: T[] | null | undefined;
    columns: ColumnDefinition<T>[];
    loading: boolean;
    getUniqueRowKey?: (item: T) => number | string;
}

export function DynamicTable<T extends DataItem>({
    data,
    columns,
    loading,
    getUniqueRowKey = (item) => item.id,
}: DynamicTableProps<T>) {
    const { getParams, applyFilters } = useQueryParams();
    const sort_column = getParams("sort_column") || "";
    const sort_order = getParams("sort_order") || "desc";

    const handleSort = (key: string) => {
        applyFilters({
            sort_column: key,
            sort_order: sort_column === key && sort_order === "asc" ? "desc" : "asc",
        });
    };

    return (
        <div className="rounded-md border bg-white shadow-sm overflow-x-auto">
            <Table className="table-fixed w-full">
                <TableHeader className="bg-blue-950">
                    <TableRow className="hover:bg-blue-950">
                        {columns.map((col) => (
                            <TableSort
                                key={col.header}
                                label={col.header}
                                width={col.width}
                                sort_column={sort_column}
                                sort_order={sort_order as "asc" | "desc"}
                                handleSort={handleSort}
                                col_key={col.sortKey}
                            />
                        ))}
                    </TableRow>
                </TableHeader>

                {loading ? (
                    <SkeletonTable rows={5} columnWidths={columns.map(c => c.width)} />
                ) : !data || data.length === 0 ? (
                    <TableNotFound colSpan={columns.length} />
                ) : (
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow
                                key={getUniqueRowKey(item)}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}
                            >
                                {columns.map((col) => (
                                    <TableCell key={col.header} className="px-4 py-2 align-middle">
                                        {col.cell(item)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </Table>
        </div>
    );
}