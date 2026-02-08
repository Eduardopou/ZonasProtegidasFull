package com.example.userapi.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

/**
 * Entidad JPA que representa una zona protegida.
 * Puede tener varios animales asociados.
 */
@Entity
@Table(name = "zonas_protegidas")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "animales")
@EqualsAndHashCode(exclude = "animales")
public class ZonaProtegidaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nombre;

    private String ubicacion;

    @OneToMany(mappedBy = "zonaProtegida", fetch = FetchType.LAZY)
    private List<AnimalModel> animales;

}