import { TableHead } from "@/components/ui/table";
import {
    ChevronUpIcon,
    ChevronDownIcon,
    ChevronsUpDownIcon,
} from "lucide-react";

interface TableSortProps {
    label: string;
    width?: string;
    col_key?: string | null;
    sort_column?: string;
    sort_order?: "asc" | "desc";
    handleSort?: (key: string) => void;
    className?: string;
}

export function TableSort({
    label,
    width,
    col_key: key,
    sort_column,
    sort_order,
    handleSort,
    className = "",
}: TableSortProps) {

    return (
        <TableHead
            className={`whitespace-nowrap px-4 py-2 text-sm font-semibold text-white ${key ? "cursor-pointer hover:bg-white/10 transition-colors" : ""} ${className}`}
            style={{ width }}
            onClick={key ? () => handleSort?.(key) : undefined}
        >
            <div className="flex items-center gap-2">
                <span>{label}</span>
                {key && (
                    <span className="flex items-center justify-center">
                        {!(sort_column === key) ? <ChevronsUpDownIcon className="w-4 h-4 text-gray-400 transition-all" /> : sort_order === "asc" ? (
                            <ChevronUpIcon className="w-4 h-4 text-blue-500 transition-all" />
                        ) : (
                            <ChevronDownIcon className="w-4 h-4 text-blue-500 transition-all" />
                        )}
                    </span>
                )}
            </div>
        </TableHead>
    );
}
