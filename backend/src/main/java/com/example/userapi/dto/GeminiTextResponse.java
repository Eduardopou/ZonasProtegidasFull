package com.example.userapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Respuesta estándar para operaciones de texto con Gemini.
 * Incluye éxito, datos generados o mensaje de error.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeminiTextResponse {
    private boolean success;
    private String data;
    private String error;

    /**
     * Crea una respuesta exitosa con datos.
     */
    public static GeminiTextResponse success(String data) {
        return new GeminiTextResponse(true, data, null);
    }

    /**
     * Crea una respuesta de error con mensaje.
     */
    public static GeminiTextResponse error(String error) {
        return new GeminiTextResponse(false, null, error);
    }
}
