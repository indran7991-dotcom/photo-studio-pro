import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { bookingsTable, packagesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { CreateBookingBody, UpdateBookingStatusBody } from "@workspace/api-zod";

const router: IRouter = Router();

function generateInvoiceNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `INV-${year}${month}-${random}`;
}

router.get("/bookings", async (req, res) => {
  try {
    const bookings = await db.select().from(bookingsTable).orderBy(bookingsTable.createdAt);
    const result = bookings.map((b) => ({
      ...b,
      packagePrice: parseFloat(b.packagePrice as string),
    }));
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch bookings");
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

router.post("/bookings", async (req, res) => {
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parsed.error.issues.map((i: any) => i.message),
    });
  }

  const data = parsed.data;

  try {
    const pkgs = await db.select().from(packagesTable).where(eq(packagesTable.id, data.packageId));
    if (pkgs.length === 0) {
      return res.status(400).json({ error: "Package not found" });
    }
    const pkg = pkgs[0];

    const invoiceNumber = generateInvoiceNumber();
    const inserted = await db
      .insert(bookingsTable)
      .values({
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        packageId: data.packageId,
        packageName: pkg.name,
        packagePrice: pkg.price,
        eventDate: data.eventDate,
        eventType: data.eventType,
        location: data.location,
        notes: data.notes ?? null,
        status: "pending",
        invoiceNumber,
      })
      .returning();

    const booking = inserted[0];
    res.status(201).json({
      ...booking,
      packagePrice: parseFloat(booking.packagePrice as string),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create booking");
    res.status(500).json({ error: "Failed to create booking" });
  }
});

router.get("/bookings/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid booking ID" });

  try {
    const bookings = await db.select().from(bookingsTable).where(eq(bookingsTable.id, id));
    if (bookings.length === 0) return res.status(404).json({ error: "Booking not found" });
    const booking = bookings[0];
    res.json({ ...booking, packagePrice: parseFloat(booking.packagePrice as string) });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch booking");
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

router.patch("/bookings/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid booking ID" });

  const parsed = UpdateBookingStatusBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid status" });

  try {
    const updated = await db
      .update(bookingsTable)
      .set({ status: parsed.data.status })
      .where(eq(bookingsTable.id, id))
      .returning();

    if (updated.length === 0) return res.status(404).json({ error: "Booking not found" });
    const booking = updated[0];
    res.json({ ...booking, packagePrice: parseFloat(booking.packagePrice as string) });
  } catch (err) {
    req.log.error({ err }, "Failed to update booking");
    res.status(500).json({ error: "Failed to update booking" });
  }
});

export default router;
