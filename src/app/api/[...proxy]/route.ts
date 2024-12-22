import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ proxy: string[] }> }) {
    return handleRequest(req, params);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ proxy: string[] }> }) {
    return handleRequest(req, params);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ proxy: string[] }> }) {
    return handleRequest(req, params);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ proxy: string[] }> }) {
    return handleRequest(req, params);
}

async function handleRequest(request: NextRequest, params: Promise<{ proxy: string[] }>) {
    const { proxy } = await params;
    const endpoint = proxy.join('/');

    const externalApiUrl = `${process.env.API_BASE_URL}/${endpoint}`

    console.log('sending ', request.headers);

    try {
        // Forward the request to the external API.
        const externalResponse = await fetch(externalApiUrl, {
            method: request.method,
            headers: {
                ...Object.fromEntries(request.headers.entries()),
            },
            body: request.method !== 'GET' && request.method !== 'HEAD' ? JSON.stringify(request.body) : undefined,
        });

        // Handle the response from the external API.
        const data = await externalResponse.json();

        // Respond back to the client with the external API's response.
        return new NextResponse(JSON.stringify(data), {
            ...externalResponse,
            status: externalResponse.status,
            url: externalResponse.url,
        });
    } catch (error: unknown) {
        console.error('Error forwarding request:', error);
        return NextResponse.json({ error: 'Error forwarding request.' }, { status: 500 });
    }
}