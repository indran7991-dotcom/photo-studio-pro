import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { testimonialsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { CreateTestimonialBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/testimonials", async (req, res) => {
  try {
    const testimonials = await db
      .select()
      .from(testimonialsTable)
      .where(eq(testimonialsTable.published, true))
      .orderBy(testimonialsTable.createdAt);
    res.json(testimonials);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch testimonials");
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

router.post("/testimonials", async (req, res) => {
  const parsed = CreateTestimonialBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Validation failed" });
  }

  try {
    const inserted = await db
      .insert(testimonialsTable)
      .values({
        clientName: parsed.data.clientName,
        clientTitle: parsed.data.clientTitle,
        rating: parsed.data.rating,
        content: parsed.data.content,
        published: parsed.data.published ?? true,
      })
      .returning();
    res.status(201).json(inserted[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to create testimonial");
    res.status(500).json({ error: "Failed to create testimonial" });
  }
});

export default router;
