package com.example.userapi.service;

import com.example.userapi.dto.UserResponse;
import com.example.userapi.model.UserModel;
import com.example.userapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para operaciones administrativas sobre usuarios.
 */
@Service
public class AdminService {

    @Autowired
    UserRepository userRepository;


    /**
     * Devuelve todos los usuarios excepto el que realiza la petición.
     */
    @Transactional(readOnly = true)
    public ResponseEntity<List<UserResponse>> findAllExcept(String emailToExclude) {

        List<UserModel> users = userRepository.findAll();

        List<UserResponse> userResponses = users.stream()
                .filter(user -> !user.getEmail().equals(emailToExclude))
                .map(userModel -> {
                    UserResponse userResponse = new UserResponse();
                    userResponse.setId(userModel.getId());
                    userResponse.setEmail(userModel.getEmail());
                    userResponse.setNombre(userModel.getNombre());
                    userResponse.setRole(userModel.getRole());
                    return userResponse;
                }).collect(Collectors.toList());

        return ResponseEntity.ok(userResponses);
    }

    /**
     * Elimina un usuario por id, validando que no sea un admin a sí mismo ni a otro admin.
     */
    @Transactional
    public void deleteUser(Long idToDelete, String adminEmail) {

        UserModel admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new RuntimeException("Error: No se encontró el usuario administrador."));

        if (admin.getId().equals(idToDelete)) {
            throw new RuntimeException("Error: Un administrador no puede eliminarse a sí mismo.");
        }

        UserModel userToDelete = userRepository.findById(idToDelete)
                .orElseThrow(() -> new RuntimeException("Error: Usuario a eliminar no encontrado."));

        if ("ROLE_ADMIN".equals(userToDelete.getRole())) {
            throw new RuntimeException("Error: No se puede eliminar a otro administrador.");
        }

        userRepository.delete(userToDelete);
    }

    @Transactional
    public void promoteToAdmin(Long userId) {
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        if ("ROLE_ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Error: El usuario ya es administrador.");
        }

        user.setRole("ROLE_ADMIN");

        userRepository.save(user);
    }



}
