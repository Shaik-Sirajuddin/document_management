import { Router } from "express";
import * as studentController from "../controllers/studentController";
const studentRouter = Router();

studentRouter.get("/documents", studentController.listDocuments);
studentRouter.post("/applications", studentController.listApplications);
studentRouter.post("/request-application", studentController.applyForDocument);

export default studentRouter;
