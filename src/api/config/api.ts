import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const api = {
    async get<T, Schema extends z.ZodType<T>>(endpoint: string, schema: Schema, options: RequestInit = {}): Promise<T> {
        return this.call<T, Schema>(endpoint, schema, { ...options, method: "GET" });
    },

    async post<T, Schema extends z.ZodType<T>>(endpoint: string, schema: Schema, body: unknown, options: RequestInit = {}): Promise<T> {
        return this.call<T, Schema>(endpoint, schema, {
            ...options,
            method: "POST",
            body: JSON.stringify(body),
        });
    },

    async put<T, Schema extends z.ZodType<T>>(endpoint: string, schema: Schema, body: unknown, options: RequestInit = {}): Promise<T> {
        return this.call<T, Schema>(endpoint, schema, {
            ...options,
            method: "PUT",
            body: JSON.stringify(body),
        });
    },

    async delete<T, Schema extends z.ZodType<T>>(endpoint: string, schema: Schema, options: RequestInit = {}): Promise<T> {
        return this.call<T, Schema>(endpoint, schema, { ...options, method: "DELETE" });
    },

    async call<T, Schema extends z.ZodType<T>>(endpoint: string, schema: Schema, options: RequestInit): Promise<T> {
        const cookieStore = await cookies();

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
                'Authorization': cookieStore.get('Authorization')?.value || '',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorText = await response.text();
            if (response.status === 401 || response.status === 403) {
                redirect('/login')
            }
            throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        const parsedData = schema.parse(data);
        return parsedData;
    },
};

export default api;
