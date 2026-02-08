package com.example.userapi.repository;

import com.example.userapi.model.AnimalModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repositorio JPA para acceder a animales registrados.
 */
public interface AnimalRepository extends JpaRepository<AnimalModel, Long> {
    /**
     * Busca animales por el id de la zona protegida asociada.
     */
    List<AnimalModel> findByZonaProtegida_Id(Long zonaProtegidaId);
}
