import Axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

import { StatusCode, IApiClient } from '@root/clients/api/interface'

const headers: Readonly<Record<string, string | boolean>> = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
};

const injectToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    try {
        const token = localStorage.getItem("accessToken");

        if (token != null && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch (error: any) {
        throw new Error(error);
    }
};

export class AxiosApiClient implements IApiClient {
    private readonly client: AxiosInstance

    protected createAxiosClient(baseURL: string): AxiosInstance {
        const instance =  Axios.create({
            baseURL,
            responseType: 'json',
            headers,
            timeout: 10 * 1000,
            withCredentials: false,
        })

        instance.interceptors.request.use(injectToken, (error) => Promise.reject(error));
        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                const { response } = error;
                return this.handleError(response);
            }
        );
        
        return instance
    }

    constructor(baseURL: string) {
        this.client = this.createAxiosClient(baseURL)
    }

    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.client.get<T, R>(url, config);
    }

    post<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.client.post<T, R>(url, data, config);
    }

    patch<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.client.patch<T, R>(url, data, config);
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.client.delete<T, R>(url, config);
    }
    
    private handleError(error: any) {
        const { status } = error;

        switch (status) {
            case StatusCode.InternalServerError: {
                console.error(error)
                break;
            }
            case StatusCode.Forbidden: {
                console.warn(error)
                break;
            }
            case StatusCode.Unauthorized: {
                console.warn(error)
                break;
            }
            case StatusCode.TooManyRequests: {
                console.warn(error)
                break;
            }
        }

        return Promise.reject(error);
    }
}
