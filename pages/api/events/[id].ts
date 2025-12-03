import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    // UPDATE EVENT
    if (req.method === "PUT") {
      const { title, start, end, color } = req.body;

      const updated = await prisma.event.update({
        where: { id: String(id) },
        data: { title, start, end, color },
      });

      return res.json(updated);
    }

    // DELETE EVENT
    if (req.method === "DELETE") {
      await prisma.event.delete({
        where: { id: String(id) },
      });

      return res.json({ success: true });
    }

    return res.status(405).json({ message: "Method Not Allowed" });

  } catch (e) {
    console.error("API ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
