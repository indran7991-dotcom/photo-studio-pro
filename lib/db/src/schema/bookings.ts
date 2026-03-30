import { pgTable, serial, text, numeric, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  packageId: integer("package_id").notNull(),
  packageName: text("package_name").notNull(),
  packagePrice: numeric("package_price", { precision: 10, scale: 2 }).notNull(),
  eventDate: text("event_date").notNull(),
  eventType: text("event_type").notNull(),
  location: text("location").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  invoiceNumber: text("invoice_number").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookingSchema = createInsertSchema(bookingsTable).omit({ id: true, createdAt: true });
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookingsTable.$inferSelect;
