"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";

interface ColumnConfig {
    label: string;
    key: string | null;
    sortable: boolean;
    width: string;
}

interface SkeletonTableProps {
    rows: number;
    columns: ColumnConfig[];
}

export function SkeletonTable({ rows, columns }: SkeletonTableProps) {
    return (
        <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                    {columns.map((col, colIndex) => (
                        <TableCell key={colIndex} style={{ width: col.width }}>
                            <div className="h-8 bg-gray-200 rounded w-full animate-pulse" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
}