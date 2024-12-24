// pages/api/general/getState.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

// MongoDB connection function
async function getStates() {
  const client = await MongoClient.connect(process.env.MONGODB_URI || "");
  try {
    const result = await client.db(process.env.MONGODB_DB).collection("state").find({}).toArray();
    return result;
  } catch (error) {
    console.error("Error fetching states:", error);
    throw new Error("Failed to fetch data from the database.");
  } finally {
    await client.close();
  }
}

// API handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getStates();
    res.status(200).json({ messagecode: 0, message: 'Success', data });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ messagecode: 500, message: 'Internal Server Error', data: [] });
  }
}
