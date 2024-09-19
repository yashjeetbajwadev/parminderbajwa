import { NextRequest, NextResponse } from 'next/server';
import { getPocketBaseInstance } from '@/lib/pocketbase';
import PocketBase from 'pocketbase';

export async function POST(request: NextRequest) {
    const pb: PocketBase = getPocketBaseInstance();
    
    try {
        const { searchParams } = new URL(request.url);
        const useCustomEndpoint = searchParams.get('custom') === 'true';
        const useJsonFormat = searchParams.get('json') === 'true';
        const collection = searchParams.get('collection');
        const customRoute = searchParams.get('route');


        let data;
        if (useJsonFormat || request.headers.get('content-type')?.includes('application/json')) {
            data = await request.json();
        } else {
            const formData = await request.formData();
            data = Object.fromEntries(formData);
        }

        let response;

        if (useCustomEndpoint) {
            // Send to custom endpoint
            response = await pb.send(`/${customRoute}`, {
                method: 'POST',
                headers: {
                    'Content-Type': useJsonFormat ? 'application/json' : 'application/x-www-form-urlencoded',
                },
                body: useJsonFormat ? JSON.stringify(data) : new URLSearchParams(data as Record<string, string>),
            });
        } else {
            // Use PocketBase collection API
            if (!collection) {
                throw new Error('Collection name is required');
            }
            response = await pb.collection(collection).create(data);
        }

        return NextResponse.json(response);
    } catch (error) {
        console.error('Failed to post data', error);
        return NextResponse.json({ error: 'Failed to post data' }, { status: 500 });
    }
}