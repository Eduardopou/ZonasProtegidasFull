package com.example.userapi.repository;

import com.example.userapi.model.InvestigacionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para acceder a investigaciones científicas.
 */
public interface InvestigacionRepository extends JpaRepository<InvestigacionModel, Long>  {
    /**
     * Busca investigaciones por el id de la zona protegida asociada.
     */
    List<InvestigacionModel> findByZonaProtegida_Id(Long zonaId);
}
