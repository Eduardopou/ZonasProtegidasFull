package com.example.userapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

/**
 * Respuesta que contiene el JWT y datos básicos del usuario autenticado.
 */
@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String message;
    private String username;
    private List<String> roles;
}
