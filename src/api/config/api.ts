import { z } from "zod";

const api = async <T, Schema extends z.ZodType<T>>(url: string, schema: Schema, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(`${process.env.BASE_URL}${url}`, {
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
};

export default api;