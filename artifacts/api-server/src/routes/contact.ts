import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactMessagesTable } from "@workspace/db/schema";
import { SubmitContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parsed.error.issues.map((i: any) => i.message),
    });
  }

  try {
    const inserted = await db
      .insert(contactMessagesTable)
      .values({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        subject: parsed.data.subject,
        message: parsed.data.message,
        read: false,
      })
      .returning();
    res.status(201).json(inserted[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to save contact message");
    res.status(500).json({ error: "Failed to save contact message" });
  }
});

router.get("/contact", async (req, res) => {
  try {
    const messages = await db
      .select()
      .from(contactMessagesTable)
      .orderBy(contactMessagesTable.createdAt);
    res.json(messages);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch contact messages");
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
