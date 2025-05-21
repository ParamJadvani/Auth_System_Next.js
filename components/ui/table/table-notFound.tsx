import { TableBody, TableCell, TableRow } from '@/components/ui/table';

export function TableNotFound({ colSpan }: { colSpan: number }) {
    return <TableBody>
        <TableRow>
            <TableCell colSpan={colSpan} className="text-center px-4 py-2 text-sm font-medium text-gray-500">
                No data found.
            </TableCell>
        </TableRow>
    </TableBody>
}