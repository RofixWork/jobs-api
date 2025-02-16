import { Router } from "express";
import JobController from "../controllers/job.controller.js";

const jobRouter = Router()

jobRouter.route('/').get(JobController.all).post(JobController.create);
jobRouter.route('/:id').get(JobController.get).patch(JobController.update).delete(JobController.delete);


export default jobRouter;