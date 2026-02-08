package com.example.userapi.controller;

import com.example.userapi.service.GeminiDiagnosticService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/gemini/diagnostic")
public class GeminiDiagnosticController {

    private static final Logger logger = LoggerFactory.getLogger(GeminiDiagnosticController.class);

    @Autowired
    private GeminiDiagnosticService diagnosticService;

    /**
     * Endpoint para listar los modelos disponibles de Gemini.
     * La respuesta principal se encuentra en los logs.
     */
    @GetMapping("/models")
    public ResponseEntity<Map<String, String>> listModels() {
        logger.info("📋 Solicitando lista de modelos disponibles...");
        diagnosticService.listAvailableModels();
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Revisa los logs de la aplicación para ver los modelos disponibles");
        response.put("endpoint", "GET /api/gemini/diagnostic/models");
        
        return ResponseEntity.ok(response);
    }
}
