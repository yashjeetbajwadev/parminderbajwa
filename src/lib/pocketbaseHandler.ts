import { getPocketBaseInstance } from '@/lib/pocketbase';
import { NextApiRequest, NextApiResponse } from 'next';
import PocketBase, { ListResult } from 'pocketbase';
import { CollectionRecords, CollectionResponses } from '@/types/pocketbase';

export async function handler<T extends keyof CollectionRecords>(
    req: NextApiRequest,
    res: NextApiResponse,
    collectionName: T
) {
    const pb: PocketBase = getPocketBaseInstance();
    
    try {
        const records: ListResult<CollectionResponses[T]> = await pb.collection(collectionName).getList(1, 20);
        res.status(200).json(records);
    } catch (error) {
        console.error('Failed to fetch data', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
