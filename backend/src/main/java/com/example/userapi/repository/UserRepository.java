package com.example.userapi.repository;

import com.example.userapi.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

/**
 * Repositorio JPA para acceder a usuarios del sistema.
 */
public interface UserRepository extends JpaRepository<UserModel, Long> {
    Optional<UserModel> findByEmail(String email);
    Optional<UserModel> findByNombre(String username);

    /**
     * Busca un usuario por email y carga inmediatamente sus animales favoritos
     * y, para cada animal, también carga su zona protegida.
     * Esto evita problemas de carga "lazy" en consultas complejas.
     */
    @Query("SELECT u FROM UserModel u " +
            "LEFT JOIN FETCH u.animalesFavoritos af " +
            "LEFT JOIN FETCH af.zonaProtegida " +
            "WHERE u.email = :email")
    Optional<UserModel> findByEmailWithFavorites(@Param("email") String email);
}
