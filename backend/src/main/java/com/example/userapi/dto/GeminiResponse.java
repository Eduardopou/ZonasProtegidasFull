package com.example.userapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Respuesta estándar de la API de Gemini.
 * Incluye candidatos generados y su contenido.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeminiResponse {
    private List<Candidate> candidates;

    /**
     * Representa un candidato generado por Gemini.
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Candidate {
        private Content content;
        @JsonProperty("finish_reason")
        private String finishReason;
    }

    /**
     * Contenido generado por un candidato.
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Content {
        private List<Part> parts;
    }

    /**
     * Parte de texto generado.
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Part {
        private String text;
    }
}
