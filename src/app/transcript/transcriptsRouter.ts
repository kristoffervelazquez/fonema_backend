import { Router } from "express";
import TranscriptController from "./transcriptsController";
import validateRequest from "../../middlewares/requestValidation";
import { createTranscriptSchema } from "./dto/createTranscriptDto";

const transcriptsRouter = Router();

const transcriptController = new TranscriptController();

transcriptsRouter.post(
  "/",
  validateRequest(createTranscriptSchema),
  transcriptController.create
);
transcriptsRouter.get("/", transcriptController.getAll);
transcriptsRouter.get("/:id", transcriptController.getById);

export default transcriptsRouter;
