package com.example.userapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * DTO para actualizar datos del usuario autenticado.
 * Actualmente solo permite actualizar el nombre.
 */
@Data
public class UserUpdateRequest {

    @NotBlank(message = "El nombre no puede estar vacío.")
    @Size(min = 3, message = "El nombre debe tener al menos 3 caracteres.")
    private String nombre;

}