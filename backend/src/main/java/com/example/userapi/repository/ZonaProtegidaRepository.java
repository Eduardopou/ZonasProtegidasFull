package com.example.userapi.repository;

import com.example.userapi.model.ZonaProtegidaModel;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio JPA para acceder a zonas protegidas.
 * Puedes agregar métodos personalizados si lo necesitas.
 */
public interface ZonaProtegidaRepository extends JpaRepository<ZonaProtegidaModel, Long> {
    // Optional<ZonaProtegidaModel> findByNombre(String nombre);
}