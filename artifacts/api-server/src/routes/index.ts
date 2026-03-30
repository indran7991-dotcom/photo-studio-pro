import { Router, type IRouter } from "express";
import healthRouter from "./health";
import packagesRouter from "./packages";
import bookingsRouter from "./bookings";
import contactRouter from "./contact";
import testimonialsRouter from "./testimonials";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(packagesRouter);
router.use(bookingsRouter);
router.use(contactRouter);
router.use(testimonialsRouter);
router.use(adminRouter);

export default router;
