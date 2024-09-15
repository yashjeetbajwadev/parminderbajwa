import { getPocketBaseInstance } from '@/lib/pocketbase';
import { NextApiRequest, NextApiResponse } from 'next';
import PocketBase, { ListResult } from 'pocketbase';
import { CollectionRecords, CollectionResponses } from '@/types/pocketbase';

async function handler<T extends keyof CollectionRecords>(
    req: NextApiRequest,
    res: NextApiResponse,
    collectionName: T
) {
    const pb: PocketBase = getPocketBaseInstance();
    const { id } = req.query;
    
    try {
        if (id) {
            // Fetch a single record
            const record = await pb.collection(collectionName).getOne(id as string);
            res.status(200).json(record);
        } else {
            // Fetch a list of records
            const records: ListResult<CollectionResponses[T]> = await pb.collection(collectionName).getList(1, 20);
            res.status(200).json(records);
        }
    } catch (error) {
        console.error('Failed to fetch data', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}

export default async function dataRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const collection: keyof CollectionRecords = req.query.collection as keyof CollectionRecords;
    if (!collection) {
        res.status(400).json({ error: 'Missing collection query parameter' });
        return;
    }
    
    await handler(req, res, collection);
}