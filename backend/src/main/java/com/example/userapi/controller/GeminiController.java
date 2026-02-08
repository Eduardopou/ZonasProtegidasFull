package com.example.userapi.controller;

import com.example.userapi.dto.GeminiTextRequest;
import com.example.userapi.dto.GeminiTextResponse;
import com.example.userapi.exception.GeminiApiException;
import com.example.userapi.service.GeminiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/gemini")
@CrossOrigin(origins = "http://localhost:4200")
public class GeminiController {

    private static final Logger logger = LoggerFactory.getLogger(GeminiController.class);

    @Autowired
    private GeminiService geminiService;

    private String getApiKey = "${gemini.api.key}";

    /**
     * Prueba la conexión con la API de Gemini y devuelve el estado de la respuesta.
     */
    @GetMapping("/test-connection")
    public ResponseEntity<?> testConnection() {
        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models?key=" + getApiKey;
            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
            java.net.http.HttpRequest request = java.net.http.HttpRequest.newBuilder()
                    .uri(java.net.URI.create(url))
                    .GET()
                    .build();
            java.net.http.HttpResponse<String> response = client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString());
            return ResponseEntity.ok("Estado: " + response.statusCode() + "\nRespuesta: " + response.body());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error local: " + e.getMessage());
        }
    }

    /**
     * Genera texto usando el modelo Gemini a partir de un prompt recibido.
     */
    @PostMapping("/generate")
    public ResponseEntity<GeminiTextResponse> generateText(@RequestBody GeminiTextRequest request) {
        try {
            if (request == null || request.getPrompt() == null || request.getPrompt().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(GeminiTextResponse.error("El prompt no puede estar vacío"));
            }
            logger.info("Solicitud recibida con prompt de {} caracteres", request.getPrompt().length());
            String response = geminiService.generateText(request.getPrompt());
            logger.info("Respuesta generada con {} caracteres", response.length());
            return ResponseEntity.ok(GeminiTextResponse.success(response));
        } catch (GeminiApiException e) {
            logger.error("Error de Gemini API: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(GeminiTextResponse.error(e.getMessage()));
        } catch (Exception e) {
            logger.error("Error inesperado: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(GeminiTextResponse.error("Error inesperado: " + e.getMessage()));
        }
    }
}
