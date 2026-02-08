package com.example.userapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * Entidad JPA que representa un animal registrado en el sistema.
 * Puede estar asociado a una zona protegida y a usuarios que lo tienen como favorito.
 */
@Entity
@Table(name = "animals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"zonaProtegida", "usuariosFavoritos"})
public class AnimalModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String scientificName;
    private boolean extinction;
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zona_protegida_id")
    private ZonaProtegidaModel zonaProtegida;

    @ManyToMany(mappedBy = "animalesFavoritos")
    @JsonIgnore
    private Set<UserModel> usuariosFavoritos = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AnimalModel that = (AnimalModel) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return id != null ? Objects.hash(id) : getClass().hashCode();
    }
}