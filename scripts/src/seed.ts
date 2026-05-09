import "dotenv/config";
import { db } from "@workspace/db";
import { packagesTable, testimonialsTable } from "@workspace/db/schema";


async function seed() {
  console.log("Seeding database...");

  // Seed packages
  await db.delete(packagesTable);
  await db.insert(packagesTable).values([
    {
      name: "Portrait Session",
      description: "A personal portrait session for individuals or couples. Includes professional lighting and post-processing.",
      price: "299.00",
      duration: "1-2 hours",
      features: [
        "Up to 2 hours shoot",
        "1 location",
        "25 edited digital photos",
        "Online gallery access",
        "Print release included",
      ],
      category: "portrait",
      popular: false,
    },
    {
      name: "Family Package",
      description: "Capture precious family moments with our relaxed and fun family photography session.",
      price: "449.00",
      duration: "2-3 hours",
      features: [
        "Up to 3 hours shoot",
        "Up to 8 family members",
        "2 locations",
        "50 edited digital photos",
        "Online gallery access",
        "Print release included",
        "One 8x10 print included",
      ],
      category: "family",
      popular: true,
    },
    {
      name: "Wedding Full Day",
      description: "Complete wedding day coverage from preparation to reception. Our most comprehensive package.",
      price: "2499.00",
      duration: "Full day (8-10 hours)",
      features: [
        "Up to 10 hours coverage",
        "2 photographers",
        "200+ edited digital photos",
        "Online gallery access",
        "Print release included",
        "Engagement session included",
        "Wedding album (50 pages)",
        "USB drive delivery",
      ],
      category: "wedding",
      popular: true,
    },
    {
      name: "Wedding Half Day",
      description: "Perfect for intimate ceremonies and smaller weddings. Quality coverage without the full-day commitment.",
      price: "1299.00",
      duration: "4-5 hours",
      features: [
        "Up to 5 hours coverage",
        "1 photographer",
        "100+ edited digital photos",
        "Online gallery access",
        "Print release included",
        "USB drive delivery",
      ],
      category: "wedding",
      popular: false,
    },
    {
      name: "Corporate & Commercial",
      description: "Professional photography for businesses, products, headshots, and corporate events.",
      price: "799.00",
      duration: "3-4 hours",
      features: [
        "Up to 4 hours shoot",
        "Studio or on-location",
        "75 edited digital photos",
        "Commercial license included",
        "Online gallery access",
        "Rush delivery available",
        "LinkedIn-optimized headshots",
      ],
      category: "commercial",
      popular: false,
    },
    {
      name: "Event Coverage",
      description: "Comprehensive coverage for galas, parties, conferences, graduations, and special occasions.",
      price: "699.00",
      duration: "3-5 hours",
      features: [
        "Up to 5 hours coverage",
        "100+ edited digital photos",
        "Online gallery access",
        "Print release included",
        "48-hour preview turnaround",
        "Full resolution downloads",
      ],
      category: "event",
      popular: false,
    },
  ]);

  // Seed testimonials
  await db.delete(testimonialsTable);
  await db.insert(testimonialsTable).values([
    {
      clientName: "Sarah & James Mitchell",
      clientTitle: "Wedding Clients",
      rating: 5,
      content: "Our wedding photos are absolutely breathtaking. Every emotion, every detail was captured perfectly. We still look at our album every anniversary and tear up. Thank you for making our day immortal!",
      published: true,
    },
    {
      clientName: "Amanda Chen",
      clientTitle: "Corporate Client",
      rating: 5,
      content: "The headshots and product photos exceeded our expectations. Our website engagement increased by 40% after the rebrand. The team was professional, efficient, and incredibly talented.",
      published: true,
    },
    {
      clientName: "The Rodriguez Family",
      clientTitle: "Family Portrait Client",
      rating: 5,
      content: "Getting four kids to sit still seemed impossible, but the photographer made it a fun adventure. The photos capture our family's personality perfectly. We've already booked for next year!",
      published: true,
    },
    {
      clientName: "David & Emma Walsh",
      clientTitle: "Engagement Session",
      rating: 5,
      content: "We were so nervous about being in front of a camera, but the session felt so natural and fun. The photos are beautiful and we can't wait for the wedding coverage!",
      published: true,
    },
    {
      clientName: "Horizon Tech Inc.",
      clientTitle: "Corporate Event",
      rating: 4,
      content: "Fantastic coverage of our annual company gala. Every important moment was documented, and the photos had a professional polish that made our social media posts shine.",
      published: true,
    },
    {
      clientName: "Priya Sharma",
      clientTitle: "Portrait Session",
      rating: 5,
      content: "I never thought I was photogenic until this session. The photographer has a magical ability to draw out genuine expressions. My family was shocked when they saw the results — they're framing everything!",
      published: true,
    },
  ]);

  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
