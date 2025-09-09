import OpenAI from "openai";
import { ChatCompletionCreateParams } from "openai/resources/chat";

export class AIService {
  private openAIClient: OpenAI;

  constructor() {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error(
        "Error Crítico: La variable de entorno OPENROUTER_API_KEY no está definida."
      );
      throw new Error("OPENROUTER_API_KEY no está configurada.");
    }

    console.log("AIService constructor: API Key encontrada.");

    this.openAIClient = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://openrouter.ai/api/v1",
    });
  }
  public async getAnalysis(
    prompt: string,
    modelIdentifier: string = "gpt-5-nano"
  ): Promise<any> {
    try {
      const params: ChatCompletionCreateParams = {
        model: modelIdentifier,
        messages: [{ role: "user", content: prompt }],
        // Forzamos la respuesta a ser un objeto JSON válido
        response_format: { type: "json_object" },
      };

      console.log(
        `Iniciando llamada a la IA con el modelo: ${modelIdentifier}...`
      );

      const completion = await this.openAIClient.chat.completions.create(
        params
      );

      const responseContent = completion.choices[0]?.message?.content;

      if (!responseContent) {
        throw new Error("La respuesta de la IA vino vacía.");
      }

      console.log("Análisis recibido de la IA con éxito.");

      // La respuesta de la IA es un string en formato JSON, lo parseamos a un objeto
      return JSON.parse(responseContent);
    } catch (error) {
      console.error(
        `Error crítico al llamar a la IA con el modelo ${modelIdentifier}:`,
        error
      );
      // Lanzamos un nuevo error para que sea capturado por el servicio que lo llamó (TranscriptService)
      throw new Error(
        `No se pudo obtener el análisis del modelo ${modelIdentifier}.`
      );
    }
  }
}
