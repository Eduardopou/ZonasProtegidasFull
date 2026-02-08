package com.example.userapi.service;

import com.example.userapi.dto.GeminiRequest;
import com.example.userapi.dto.GeminiResponse;
import com.example.userapi.exception.GeminiApiException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Servicio para interactuar con la API de Gemini y generar texto.
 * Incluye manejo de reintentos y errores específicos de la API.
 */
@Service
public class GeminiService {

    private static final Logger logger = LoggerFactory.getLogger(GeminiService.class);
    private final WebClient webClient;
    private final String apiKey;

    public GeminiService(@Value("${gemini.api.key}") String apiKey) {
        this.apiKey = apiKey;
        this.webClient = WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com")
                .build();
    }

    /**
     * Genera texto usando el modelo Gemini a partir de un prompt.
     * Realiza reintentos automáticos en caso de error 429.
     */
    public String generateText(String prompt) {
        GeminiRequest request = createRequest(prompt);
        URI uri = URI.create("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey);

        int maxAttempts = 4; // 1 intento + 3 reintentos
        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                GeminiResponse response = webClient.post()
                        .uri(uri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(request)
                        .exchangeToMono(clientResponse -> {
                            if (clientResponse.statusCode().value() == 429) {
                                String retryAfter = clientResponse.headers().asHttpHeaders().getFirst("Retry-After");
                                return clientResponse.bodyToMono(String.class)
                                        .flatMap(body -> Mono.error(new TooManyRequestsException(body, retryAfter)));
                            }
                            if (clientResponse.statusCode().isError()) {
                                return clientResponse.bodyToMono(String.class)
                                        .flatMap(body -> Mono.error(new GeminiApiException("Error Gemini: " + body)));
                            }
                            return clientResponse.bodyToMono(GeminiResponse.class);
                        })
                        .block();

                return extractResponseText(response);

            } catch (TooManyRequestsException e) {
                long delayMs = computeDelayMs(e.getRetryAfter(), attempt);
                logger.warn("429 recibido. Reintentando en {} ms (intento {}/{})", delayMs, attempt, maxAttempts);
                sleep(delayMs);
            } catch (WebClientResponseException wex) {
                if (wex.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS && attempt < maxAttempts) {
                    String retryAfter = wex.getHeaders() != null
                            ? wex.getHeaders().getFirst("Retry-After")
                            : null;
                    long delayMs = computeDelayMs(retryAfter, attempt);
                    logger.warn("429 recibido. Reintentando en {} ms (intento {}/{})", delayMs, attempt, maxAttempts);
                    sleep(delayMs);
                } else {
                    logger.error("Error WebClient: {}", wex.getResponseBodyAsString(), wex);
                    throw new GeminiApiException("Error Gemini: " + wex.getResponseBodyAsString());
                }
            }catch (Exception e) {
                logger.error("Error llamando a Gemini RPC", e);
                throw new GeminiApiException(e.getMessage());
            }
        }
        throw new GeminiApiException("Se agotaron los reintentos por 429");
    }

    private long computeDelayMs(String retryAfter, int attempt) {
        // Retry-After en segundos o en fecha HTTP
        if (retryAfter != null) {
            try {
                long secs = Long.parseLong(retryAfter.trim());
                return Math.max(1000L, secs * 1000L);
            } catch (NumberFormatException ignored) {
                try {
                    ZonedDateTime until = ZonedDateTime.parse(retryAfter, DateTimeFormatter.RFC_1123_DATE_TIME);
                    long ms = until.toInstant().toEpochMilli() - System.currentTimeMillis();
                    return Math.max(1000L, ms);
                } catch (Exception ignored2) {}
            }
        }
        long base = (long) Math.pow(2, attempt - 1) * 1000L; 
        long jitter = ThreadLocalRandom.current().nextLong(0, 300);
        return Math.min(base + jitter, 10000L);
    }

    private void sleep(long ms) {
        try { Thread.sleep(ms); } catch (InterruptedException ie) { Thread.currentThread().interrupt(); }
    }

    static class TooManyRequestsException extends RuntimeException {
        private final String retryAfter;
        public TooManyRequestsException(String msg, String retryAfter) {
            super(msg);
            this.retryAfter = retryAfter;
        }
        public String getRetryAfter() { return retryAfter; }
    }


    private GeminiRequest createRequest(String prompt) {
        GeminiRequest request = new GeminiRequest();
        GeminiRequest.Content content = new GeminiRequest.Content();
        GeminiRequest.Part part = new GeminiRequest.Part();
        part.setText(prompt);
        content.setParts(Collections.singletonList(part));
        request.setContents(Collections.singletonList(content));
        return request;
    }

    private String extractResponseText(GeminiResponse response) {
        if (response == null || response.getCandidates() == null || response.getCandidates().isEmpty()) {
            return "Sin respuesta";
        }
        return response.getCandidates().get(0).getContent().getParts().get(0).getText();
    }
}