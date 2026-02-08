package com.example.userapi.dto;

import lombok.Data;

/**
 * DTO para exponer información de una investigación científica.
 */
@Data
public class InvestigacionResponse {
    private Long id;

    private String titulo;
    private String institucion;
    private String investigadorPrincipal;
    private String fechaInicio;
    private String estado;
    private String resumen;
    private String permisosGobierno;
    private int progreso;
    private String zonaProtegidaNombre;
}
