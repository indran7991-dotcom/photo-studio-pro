import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { packagesTable } from "@workspace/db/schema";

const router: IRouter = Router();

router.get("/packages", async (req, res) => {
  try {
    const packages = await db.select().from(packagesTable).orderBy(packagesTable.price);
    const result = packages.map((p) => ({
      ...p,
      price: parseFloat(p.price as string),
      features: p.features as string[],
    }));
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch packages");
    res.status(500).json({ error: "Failed to fetch packages" });
  }
});

export default router;
