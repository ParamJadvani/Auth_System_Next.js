import axios from 'axios';

export function handleAPIError(err: unknown, optionalError: string): { error: boolean; message: string | string[] } {
    if (axios.isAxiosError(err)) {
        if (err.response?.data.error)
            return {
                error: true,
                message: err.response.data.error,
            };
        if (err.response?.data.errors)
            return {
                error: true,
                message: err.response.data.errors.map(
                    ({ message }: { message: string }) => message
                ),
            };

        if (err.response?.data.message)
            return {
                error: true,
                message: err.response.data.message,
            };
    }
    if (err instanceof Error) {
        return {
            error: true,
            message: [err.message],
        };
    }
    return {
        error: true,
        message: [optionalError],
    };
}