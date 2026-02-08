package com.example.userapi.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entidad JPA que representa una investigación científica asociada a una zona protegida.
 */
@Entity
@Table(name = "investigacion_model")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"zonaProtegida"})
public class InvestigacionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "institucion")
    private String institucion;

    @Column(name = "investigador_principal")
    private String investigadorPrincipal;

    @Column(name = "fecha_inicio")
    private String fechaInicio;

    private String estado;

    private String resumen;

    @Column(name = "permisos_gobierno")
    private String permisosGobierno;

    private int progreso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zona_protegida_id")
    private ZonaProtegidaModel zonaProtegida;
}