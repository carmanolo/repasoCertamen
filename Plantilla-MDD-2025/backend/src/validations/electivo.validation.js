"use strict";
import Joi from "joi";


// Esquema de validación para el registro de usuarios
export const registerElectivoValidation = Joi.object({
  nombre_electivo: Joi.string()
    .min(3)
    .max(50)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
      "string.pattern.base":
        "El nombre de usuario solo puede contener letras, números y guiones bajos.",
      "string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
      "string.max": "El nombre de usuario no puede exceder los 30 caracteres.",
      "string.empty": "El nombre de usuario es obligatorio.",
    }),
  cupos: Joi.string()
    .integer()
    .positive()
    .required()
    .min(15)
    .max(30)
    .messages({
        "integer.empty": "los cupos no pueden estar vacío",
        "integer.base": "El cupo debe ser un integer",
        "integer.positive": "El cupo debe ser positivo"
    }),
  creditos: Joi.string()
    .integer()
    .positive()
    .required()
    .min(120)
    .max(200)
    .messages({
        "integer.empty": "los creditos no pueden estar vacío",
        "integer.base": "El credito debe ser un integer",
        "integer.positive": "El credito debe ser positivo"
    }),

})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten campos adicionales",
  });

// Esquema de validación para el inicio de sesión
export const loginValidation = Joi.object({
  nombre_electivo: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
      "string.pattern.base":
        "El nombre de usuario solo puede contener letras, números y guiones bajos.",
      "string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
      "string.max": "El nombre de usuario no puede exceder los 30 caracteres.",
      "string.empty": "El nombre de usuario es obligatorio.",
    }),
  cupos: Joi.string()
    .integer()
    .positive()
    .min(15)
    .max(30)
    .messages({
        "integer.empty": "los cupos no pueden estar vacío",
        "integer.base": "El cupo debe ser un integer",
        "integer.positive": "El cupo debe ser positivo"
    }),
  creditos: Joi.string()
    .integer()
    .positive()
    .min(120)
    .max(200)
    .messages({
        "integer.empty": "los creditos no pueden estar vacío",
        "integer.base": "El credito debe ser un integer",
        "integer.positive": "El credito debe ser positivo"
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten campos adicionales",
  });
