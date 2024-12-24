// pages/api/general/ss.js

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Do something with the request, like fetching data
  const data = { message: "Hello from the API!" };

  // Send a response using res.json() or res.send()
  res.status(200).json(data); // Sending the response as JSON
}
