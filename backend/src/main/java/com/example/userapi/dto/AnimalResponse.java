package com.example.userapi.dto;

import lombok.Data;

/**
 * DTO para exponer información de un animal registrado.
 */
@Data
public class AnimalResponse {
    private Long id;
    private String name;
    private String scientificName;
    private boolean extinction;
    private String image;

    private String zonaProtegidaNombre;
}