import express from "express";
import { routesHelper } from "./routesHelper";
import PersonController from "../controllers/personController";
import { INewPerson } from "../models/peopleModels";

const router = express.Router();
const controller = new PersonController();

router.post(
    "/",
    routesHelper((req, res) => controller.addPerson(req.body as INewPerson, res))
);

router.get(
    "/:id/contact",
    routesHelper((req, _) =>
        controller.getPerson(req.params.id)
    )
);

router.put(
    "/:id/",
    routesHelper((req, res) => controller.updatePerson(req.params.id, req.body, res))
);

router.delete(
    "/:id/",
    routesHelper((req, res) => controller.deletePerson(req.params.id, res))
);

export default router;
