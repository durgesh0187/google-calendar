import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // GET ALL EVENTS
    if (req.method === "GET") {
      const events = await prisma.event.findMany({
        orderBy: { start: "asc" },
      });
      return res.json(events);
    }

    // CREATE EVENT
    if (req.method === "POST") {
      const { title, start, end, color } = req.body;

      const event = await prisma.event.create({
        data: { title, start, end, color },
      });

      return res.json(event);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (e) {
    console.error("API ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
