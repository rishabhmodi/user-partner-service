import { Router } from "express";
import UserController from "../apis/user/UserController";
import DeliveryPartnerController from "../apis/delivery_partner/DeliveryPartnerController";
import UserMiddleware from "../apis/user/UserMiddleware";

const router = Router();

// User
router.post("/signup", UserController._signup);
router.post("/signin", UserController._signin);

router.post(
  "/create-order",
  UserMiddleware._authenticateUser,
  UserController._createOrder
);

// Delivery Partner
router.post(
  "/delivery-partner",
  DeliveryPartnerController._createDeliveryPartner
);
router.get(
  "/delivery-partners",
  DeliveryPartnerController._getDeliveryPartners
);

export default router;
