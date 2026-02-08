package com.example.userapi.exception;

/**
 * Excepción personalizada para errores relacionados con la API de Gemini.
 * Permite manejar mensajes y causas específicas.
 */
public class GeminiApiException extends RuntimeException {
    public GeminiApiException(String message) {
        super(message);
    }

    public GeminiApiException(String message, Throwable cause) {
        super(message, cause);
    }
}
