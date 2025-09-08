import { AIService } from "./../../services/aiService";
import { TranscriptRepository } from "./transcriptRepository";
import { Analysis } from "./transcriptTypes";

class TranscriptService {
  private transcriptRepository: TranscriptRepository;
  private aiService: AIService;

  constructor() {
    this.transcriptRepository = new TranscriptRepository();
    this.aiService = new AIService();
  }

  public async getAll() {
    const transcripts = this.transcriptRepository.findAll();
    return transcripts;
  }
  public async create(body: any) {
    const { transcript } = body;

    const prompt = `
    Eres un asistente experto en analizar transcripciones de llamadas para gerentes. Tu objetivo es proporcionar un análisis claro, conciso y útil que facilite la toma de decisiones.
    A continuación, te presento una transcripción de una llamada. Por favor, analiza el texto y genera una respuesta estrictamente en formato JSON con la siguiente estructura:
    {
    "summary": "Un resumen ejecutivo de 2 a 3 frases sobre los puntos clave de la conversación, el propósito y el resultado.",
    "sentiment": {
    "score": "Positivo, Negativo o Neutral.",
    "reason": "Una breve explicación (1-2 frases) del porqué de este sentimiento, basada en el lenguaje, tono y palabras clave utilizadas por el usuario y el agente."
    },
    "action_items": [
     {
      "owner": "Quién es el responsable de la tarea (ej. 'Agente', 'Usuario').",
      "task": "La descripción clara y concisa de la tarea a realizar.",
      "ts": "El timestamp exacto de la transcripción donde se mencionó la tarea."
      }
      ]
    }

    Transcripción:
    ---
    ${JSON.stringify(transcript)}
    ---
    `;

    const analysis: Analysis = await this.aiService.getAnalysis(prompt);

    return this.transcriptRepository.create({
      original_json: transcript,
      summary: analysis.summary,
      action_items: analysis.action_items,
      sentiment: analysis.sentiment,
    });
  }
  public async getById(id: string) {
    const _id = +id;
    return this.transcriptRepository.findById(_id);
  }
}

export default TranscriptService;
