package com.example.userapi.controller;

import com.example.userapi.dto.AnimalResponse;
import com.example.userapi.dto.UserResponse;
import com.example.userapi.dto.UserUpdateRequest;
import com.example.userapi.model.AnimalModel;
import com.example.userapi.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Devuelve los datos del perfil del usuario autenticado.
     */
    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getMyProfile(Principal principal) {
        UserResponse userProfile = userService.getUserProfile(principal.getName());
        return ResponseEntity.ok(userProfile);
    }

    /**
     * Permite subir o actualizar la imagen de perfil del usuario.
     */
    @PostMapping("/profile/image")
    public ResponseEntity<UserResponse> uploadProfileImage(
            Principal principal,
            @RequestParam("file") MultipartFile file
    ) {
        UserResponse updatedUser = userService.updateProfileImage(principal.getName(), file);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Actualiza los datos del perfil del usuario autenticado.
     */
    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateMyProfile(
            Principal principal,
            @Valid @RequestBody UserUpdateRequest request
    ) {
        UserResponse updatedUser = userService.updateUserProfile(principal.getName(), request);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Devuelve la lista de animales favoritos del usuario autenticado.
     */
    @GetMapping("/profile/favorites")
    public ResponseEntity<List<AnimalResponse>> getMyFavorites(Principal principal) {
        List<AnimalResponse> response = userService.getFavorites(principal.getName());
        return ResponseEntity.ok(response);
    }

    /**
     * Añade un animal a la lista de favoritos del usuario.
     */
    @PostMapping("/profile/favorites/{animalId}")
    public ResponseEntity<Void> addFavorite(@PathVariable Long animalId, Principal principal) {
        userService.addFavorite(principal.getName(), animalId);
        return ResponseEntity.ok().build();
    }

    /**
     * Elimina un animal de la lista de favoritos del usuario.
     */
    @DeleteMapping("/profile/favorites/{animalId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long animalId, Principal principal) {
        userService.removeFavorite(principal.getName(), animalId);
        return ResponseEntity.ok().build();
    }
}