import express from "express";
import { routesHelper } from "./routesHelper";
import AuthController from "../controllers/authController";

const router = express.Router();
const controller = new AuthController();

router.post(
  "/:authId",
  routesHelper((req, res) =>
    controller.setUserRole(req.params.authId, req.body, res)
  )
);

export default router;
