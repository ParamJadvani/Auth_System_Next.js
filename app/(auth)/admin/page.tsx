import { AdminFormDialog } from '@/app/(auth)/admin/_adminFormDialog';
import { DisplayAdminsData } from '@/app/(auth)/admin/_displayAdminsData';

export default function AdminPage() {
    return (
        <div className="p-4">
            <AdminFormDialog />
            <DisplayAdminsData />
        </div>
    );
}
