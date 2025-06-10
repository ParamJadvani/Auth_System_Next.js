// /components/ui/pagination.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { Meta } from '@/types/admin';

interface PaginationProps {
    data: Meta | undefined;
    currentPage: number;
    onPageChange: (newPage: number) => void;
    onLimitChange: (limit: string) => void;
}

export function Pagination({ data, currentPage, onPageChange, onLimitChange }: PaginationProps) {
    if (!data || data.total <= 10) return null;

    const totalPages = data.last_page;
    const hasMore = currentPage < totalPages;

    return (
        <div className="mt-4 flex justify-between items-center gap-4">
            <div className="flex justify-center items-center gap-4">
                <Button
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span>Page {currentPage}</span>
                <Button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasMore}
                >
                    Next
                </Button>
            </div>
            <div className="flex items-center space-x-6 mr-5">
                <span className="text-sm font-medium">
                    {`${(currentPage - 1) * data.per_page + 1} - ${Math.min(
                        currentPage * data.per_page,
                        data.total,
                    )} of ${data.total} records`}
                </span>
                <Select
                    value={data.per_page.toString()}
                    onValueChange={onLimitChange}
                >
                    <SelectTrigger id="limit">
                        <SelectValue placeholder="Per page" />
                    </SelectTrigger>
                    <SelectContent>
                        {['5', '10', '50', '100'].map((pageLimit) => (
                            <SelectItem key={pageLimit} value={pageLimit}>
                                {pageLimit}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}