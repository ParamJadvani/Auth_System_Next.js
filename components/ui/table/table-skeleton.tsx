"use client";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

interface SkeletonTableProps {
    rows: number;
    columns: { width: string; }[];
}

export function SkeletonTable({ rows, columns }: SkeletonTableProps) {
    return (
        <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                    {columns.map((col, colIndex) => (
                        <TableCell key={colIndex} style={{ width: col.width }} className='px-2 py-2'>
                            <div className="h-7 bg-gray-200 rounded w-full animate-pulse" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
}