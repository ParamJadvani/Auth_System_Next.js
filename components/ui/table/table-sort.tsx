import { TableHead } from "@/components/ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";

interface TableSortProps {
    label: string;
    width: string;
    col_key: string | null;
    sort_column: string;
    sort_order: "asc" | "desc";
    handleSort: (key: string) => void;
    className?: string;
}

export function TableSort({
    label,
    width,
    col_key: key,
    sort_column,
    sort_order,
    handleSort,
    className,
}: TableSortProps) {
    return (
        <TableHead
            className={`text-white whitespace-nowrap px-4 py-2 text-sm font-semibold ${key ? "cursor-pointer" : ""} ${className || ""}`}
            style={{ width }}
        >
            <span
                className="flex items-center gap-1"
                onClick={key ? () => handleSort(key) : undefined}
            >
                {label}
                {key && (
                    <span className="flex flex-col items-center">
                        {sort_column === key ? (
                            sort_order === "asc" ? (
                                <ArrowUp className="w-4 h-4 text-white" />
                            ) : (
                                <ArrowDown className="w-4 h-4 text-white" />
                            )
                        ) : (
                            <span className='flex '>
                                <ArrowUp className="w-4 h-4 text-gray-400" />
                                <ArrowDown className="w-4 h-4 text-gray-400" />
                            </span>
                        )}
                    </span>
                )}
            </span>
        </TableHead>
    );
}