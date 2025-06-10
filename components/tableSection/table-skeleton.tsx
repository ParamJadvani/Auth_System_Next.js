"use client";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

interface SkeletonTableProps {
    rows: number;
    columnWidths: string[];
}

export function SkeletonTable({ rows, columnWidths }: SkeletonTableProps) {
    return (
        <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                    {columnWidths.map((width, colIndex) => (
                        <TableCell key={colIndex} style={{ width }} className='px-4 py-2'>
                            <div className="h-7 bg-gray-200 rounded w-full animate-pulse" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
}