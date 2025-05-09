import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-toastify';

export const toastMessage = ({ response, url, router }: {
    response: {
        error: boolean;
        message: string[] | string;
    };
    url?: string;
    router?: AppRouterInstance;
}) => {
    if (response.error) {
        if (Array.isArray(response.message)) {
            response.message.forEach((message) => toast.error(message));
        }
        else toast.error(response.message);
    }
    else if (response.message) {
        toast.success(response.message);
        if (url) {
            router?.replace(url);
        }
    }
}