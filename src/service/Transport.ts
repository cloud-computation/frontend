import axios, { AxiosInstance } from "axios";
import { AxiosRequestConfig } from "axios";
import { mapValues, isString } from "lodash";
import {TResponse} from "../entity";

export type TransportConfig = Pick<AxiosRequestConfig, "headers" | "baseURL" | "params">;

export class Transport {
    private headers = {};
    private token?: string;
    private instance: AxiosInstance = null;

    init(serverUrl: string): void {
        this.instance = axios.create({
            baseURL: serverUrl,
        });
    }

    async get<Response>(url: string, params?: object): Promise<TResponse<Response>> {
        const response = await this.instance.get(url, this.config(params));
        return response.data;
    }

    async post<Request, Response>(
        url: string,
        data?: Request,
        params?: object,
    ): Promise<TResponse<Response>> {
        const response = await this.instance.post(url, data, this.config(params));
        return response.data;
    }

    async put<Request, Response>(
        url: string,
        data: Request,
        params?: object,
    ): Promise<TResponse<Response>> {
        const response = await this.instance.put(url, data, this.config(params));
        return response.data;
    }

    async delete<Response = void>(url: string, params?: object): Promise<TResponse<Response>> {
        const response = await this.instance.delete(url, this.config(params));
        return response.data;
    }

    setToken(token: string): void {
        this.token = token;
        localStorage.setItem("token", token);
    }

    formatToFormData(params: {}): FormData {
        const formData = new FormData();
        mapValues(params, (value: string | File, key) => {
            const isFile = !isString(value) && (value as {}) instanceof File;
            if (!isFile && !isString(value)) {
                return formData.append(key, JSON.stringify(value));
            }
            formData.append(key, value);
        });
        return formData;
    }

    private config(params?: object): TransportConfig {
        return {
            headers: {
                ...this.headers,
                "Content-Type": "application/json",
                token: this.token
            },
            params,
        };
    }
}

export const transport = new Transport();
