import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { bookingsTable, contactMessagesTable, testimonialsTable } from "@workspace/db/schema";
import { eq, sum, count } from "drizzle-orm";

const router: IRouter = Router();

router.get("/admin/stats", async (req, res) => {
  try {
    const allBookings = await db.select().from(bookingsTable);
    const totalBookings = allBookings.length;
    const pendingBookings = allBookings.filter((b) => b.status === "pending").length;
    const confirmedBookings = allBookings.filter((b) => b.status === "confirmed").length;
    const completedBookings = allBookings.filter((b) => b.status === "completed").length;
    const totalRevenue = allBookings
      .filter((b) => b.status !== "cancelled")
      .reduce((sum, b) => sum + parseFloat(b.packagePrice as string), 0);

    const allMessages = await db.select().from(contactMessagesTable);
    const unreadMessages = allMessages.filter((m) => !m.read).length;

    const allTestimonials = await db.select().from(testimonialsTable);
    const totalTestimonials = allTestimonials.length;

    res.json({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      totalRevenue,
      unreadMessages,
      totalTestimonials,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch admin stats");
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
