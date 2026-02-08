package com.example.userapi.dto;

import lombok.Data;

/**
 * DTO para recibir datos de un animal al crear o actualizar.
 */
@Data
public class AnimalRequest {

    private String name;

    private String scientificName;

    private boolean extinction;

    private String image;

    private Long zonaProtegidaId;



}
