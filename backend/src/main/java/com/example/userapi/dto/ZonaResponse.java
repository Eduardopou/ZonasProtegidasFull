package com.example.userapi.dto;

import lombok.Data;

/**
 * DTO para exponer información básica de una zona protegida.
 */
@Data
public class ZonaResponse {
    private Long id;
    private String nombre;
    private String ubicacion;
}
