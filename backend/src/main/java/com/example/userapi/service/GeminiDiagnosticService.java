package com.example.userapi.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * Servicio para diagnóstico y pruebas de la API de Gemini.
 * Permite listar los modelos disponibles usando WebClient.
 */
@Service
public class GeminiDiagnosticService {
    private static final Logger logger = LoggerFactory.getLogger(GeminiDiagnosticService.class);
    private final WebClient webClient;
    private final String apiKey;

    public GeminiDiagnosticService(@Value("${gemini.api.key}") String apiKey) {
        this.apiKey = apiKey;
        this.webClient = WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com")
                .build();
    }

    /**
     * Lista los modelos disponibles en la API de Gemini y los muestra en los logs.
     */
    public void listAvailableModels() {
        logger.info("🔍 Listando modelos disponibles en Gemini API...");

        try {
            String response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/v1/models")
                            .queryParam("key", apiKey)
                            .build())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            logger.info("📋 Modelos disponibles:\n{}", response);
        } catch (Exception e) {
            logger.error("Error al listar modelos: {}", e.getMessage(), e);
        }
    }
}
