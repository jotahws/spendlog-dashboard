import { z } from "zod";

const api = {
    async get<T, Schema extends z.ZodType<T>>(url: string, schema: Schema, options: RequestInit = {}): Promise<T> {
        return this.call<T, Schema>(url, schema, { ...options, method: "GET" });
    },

    async post<T, Schema extends z.ZodType<T>>(url: string, schema: Schema, body: unknown, options: RequestInit = {}): Promise<T> {
        return this.call<T, Schema>(url, schema, {
            ...options,
            method: "POST",
            body: JSON.stringify(body),
        });
    },

    async put<T, Schema extends z.ZodType<T>>(url: string, schema: Schema, body: unknown, options: RequestInit = {}): Promise<T> {
        return this.call<T, Schema>(url, schema, {
            ...options,
            method: "PUT",
            body: JSON.stringify(body),
        });
    },

    async delete<T, Schema extends z.ZodType<T>>(url: string, schema: Schema, options: RequestInit = {}): Promise<T> {
        return this.call<T, Schema>(url, schema, { ...options, method: "DELETE" });
    },

    async call<T, Schema extends z.ZodType<T>>(url: string, schema: Schema, options: RequestInit): Promise<T> {
        const response = await fetch(`${process.env.API_BASE_URL}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
        }

        const data = await response.json();
        const parsedData = schema.parse(data);
        return parsedData;
    },
};

export default api;
