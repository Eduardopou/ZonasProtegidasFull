package com.example.userapi.dto;

import lombok.Data;

/**
 * DTO para exponer los datos públicos del usuario.
 */
@Data
public class UserResponse {
    private Long id;
    private String nombre;
    private String email;
    private String role;
    private String profileImage;
}