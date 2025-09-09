// src/features/transcript/transcriptSchemas.ts

import Joi from "joi";

// Esquema para una sola entrada en la transcripción
const transcriptEntrySchema = Joi.object({
  ts: Joi.string().required(),
  speaker: Joi.string().required(),
  text: Joi.string().required(),
});

// Esquema para el cuerpo (body) de la petición de creación
export const createTranscriptSchema = Joi.object({
  transcript: Joi.array()
    .items(transcriptEntrySchema) // El arreglo debe contener objetos que cumplan con el esquema de arriba
    .min(1) // El arreglo debe tener al menos un elemento
    .required() // El campo 'transcript' es obligatorio en el body
    .messages({
      "any.required": 'El campo "transcript" es requerido.',
      "array.min": "La transcripción debe contener al menos una entrada.",
      "array.base": 'El campo "transcript" debe ser un arreglo.',
    }),
  model: Joi.string().optional(),
});
