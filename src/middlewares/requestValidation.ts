import { NextFunction, Request, Response } from "express";
import Joi from "joi";

function validateRequest(schema: Joi.AnySchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value, warning } = schema.validate(req.body);
    console.log({ value });

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
        message: "Error en la validación",
      });
    }
    console.log("me pasé");

    next();
  };
}

export default validateRequest;
