"use client";

import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { SkeletonTable } from "@/components/ui/table/table-skeleton";
import { useQueryParams } from "@/hooks/use-query-params";
import { TableNotFound } from "@/components/ui/table/table-notFound";
import { TableSort } from '@/components/ui/table/table-sort';
import { CredentialResponse } from '@/types/credentials';
import { CredentialRow } from '@/components/credentials/row-card';
import useCredentials from '@/hooks/use-Credentials';
import { toast } from 'react-toastify';


interface Column {
    label: string;
    key: string | null;
    width: string;
}

interface TableDisplayProps {
    data: CredentialResponse | undefined;
    loading: boolean;
    admin?: boolean;
    onDelete: (id: number) => void;
    isEmp?: number
}

export function TableDisplay({ data, loading, onDelete, isEmp = undefined }: TableDisplayProps) {
    const { getParams, applyFilters } = useQueryParams();
    const sort_column = getParams("sort_column") || "employee_id";
    const sort_order = getParams("sort_order") || "desc";

    const { generateShareLink } = useCredentials()

    const columns: Column[] = [
        { label: "Name", key: "name", width: "20%" },
        { label: "Website URL", key: null, width: "20%" },
        { label: "Username", key: null, width: "20%" },
        { label: "Password", key: null, width: "20%" },
        { label: "Created Date", key: "created_at", width: "20%" },
        { label: "Action", key: null, width: "10%" },
    ];

    const shareLoginURL = async (credentialId: number) => {
        await navigator.clipboard.writeText(await generateShareLink(credentialId));
        toast.success("Copied to clipboard");
    };

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
                                key={col.label}
                                label={col.label}
                                width={col.width}
                                sort_column={sort_column}
                                sort_order={sort_order as "asc" | "desc"}
                                handleSort={handleSort}
                                col_key={col.key}
                            />
                        ))}
                    </TableRow>
                </TableHeader>

                {loading ? (
                    <SkeletonTable rows={5} columns={columns} />
                ) : !data?.data || data.data.length === 0 ? (
                    <TableNotFound colSpan={columns.length} />
                ) : (
                    <TableBody>
                        {data?.data?.map((credential) => (
                            <CredentialRow key={credential.id} credential={credential} onDelete={onDelete} shareLoginURL={shareLoginURL} isEmp={isEmp} />
                        ))}
                    </TableBody>
                )}
            </Table>
        </div>
    );
}
