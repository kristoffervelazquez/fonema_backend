import { Request, Response } from "express";
import TranscriptService from "./transcriptService";
import { AIService } from "../../services/aiService";

class TranscriptController {
  private transcriptService: TranscriptService;

  constructor() {
    this.transcriptService = new TranscriptService();
  }

  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const transcripts = await this.transcriptService.getAll();
      res.status(200).json(transcripts);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const transcript = await this.transcriptService.create(req.body);
      res.status(201).json(transcript);
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "Internal server error" });
    }
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const transcript = await this.transcriptService.getById(req.params.id);
      res.status(200).json(transcript);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

export default TranscriptController;
