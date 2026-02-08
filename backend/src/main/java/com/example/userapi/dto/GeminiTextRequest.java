package com.example.userapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para enviar un prompt de texto a la API de Gemini.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeminiTextRequest {
    private String prompt;
}
