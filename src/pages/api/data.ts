import { NextApiRequest, NextApiResponse } from "next";
import { handler } from "@/lib/pocketbaseHandler"; // Adjust this import path as needed
import { CollectionRecords } from "@/types/pocketbase";

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
