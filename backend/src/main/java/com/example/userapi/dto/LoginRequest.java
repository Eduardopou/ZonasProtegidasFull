package com.example.userapi.dto;

import lombok.Data;

/**
 * DTO para la solicitud de inicio de sesión.
 * Contiene usuario y contraseña.
 */
@Data
public class LoginRequest {
    private String username;
    private String password;
}
