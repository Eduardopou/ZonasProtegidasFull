package com.example.userapi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * DTO para registrar un nuevo usuario en el sistema.
 * Incluye validaciones básicas.
 */
@Data
public class RegisterRequest {

    @NotBlank(message = "El nombre no puede estar vacío.")
    @Size(min = 3, message = "El nombre debe tener al menos 3 caracteres.")
    private String nombre;

    @NotBlank(message = "El email no puede estar vacío.")
    @Email(message = "Debe proporcionar un formato de email válido.")
    private String email;

    @NotBlank(message = "La contraseña no puede estar vacía.")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres.")
    private String password;
}