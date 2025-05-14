import { getToken } from '@/lib/cookies';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

export const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = await getToken("auth_token");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}

export const onResponse = (response: AxiosResponse): AxiosResponse => {
    const data = response.data as {
        success?: string;
    }

    if (data.success) {
        toast.success(data.success);
    }

    return response;
};

export const onResponseError = (error: AxiosError): Promise<never> => {
    const status = error.response?.status;
    const data = error.response?.data as {
        error?: string;
        errors?: { message: string }[];
        message?: string;
    };

    if (status === 404) {
        toast.error("Not Found");
    } else if (Array.isArray(data?.errors) && data.errors.length > 0) {
        toast.error(data.errors[0].message);
    } else if (data?.error) {
        toast.error(data.error);
    } else if (data?.message) {
        toast.error(data.message);
    } else {
        toast.error("An unknown error occurred. Please try again.");
    }

    return Promise.reject(error);
};