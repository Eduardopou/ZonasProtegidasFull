package com.example.userapi.service;

import com.example.userapi.dto.AnimalResponse;
import com.example.userapi.dto.UserResponse;
import com.example.userapi.dto.UserUpdateRequest;
import com.example.userapi.model.AnimalModel;
import com.example.userapi.model.UserModel;
import com.example.userapi.repository.AnimalRepository;
import com.example.userapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Servicio para operaciones sobre usuarios, perfil y favoritos.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    FileStorageService fileStorageService;


    /**
     * Devuelve el perfil del usuario autenticado.
     */
    @Transactional(readOnly = true)
    public UserResponse getUserProfile(String userEmail) {
        // Busca al usuario en la BD
        UserModel user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Mapea los datos al DTO (UserResponse)
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setNombre(user.getNombre());
        response.setEmail(user.getEmail());
        String friendlyRole = user.getRole().equals("ROLE_ADMIN") ? "Administrador" : "Usuario";
        response.setRole(friendlyRole);
        response.setProfileImage(user.getProfileImage());

        return response;
    }

    /**
     * Actualiza la imagen de perfil del usuario.
     */
    @Transactional
    public UserResponse updateProfileImage(String userEmail, MultipartFile imageFile) {
        // Guarda la imagen en el servidor
        String imagePath = fileStorageService.saveFile(imageFile);

        // Busca al usuario
        UserModel user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        //Actualiza la ruta de la imagen en el usuario
        user.setProfileImage(imagePath);

        // Guarda los cambios en la BD
        UserModel updatedUser = userRepository.save(user);

        // Devuelve el perfil actualizado 
        return getUserProfile(updatedUser.getEmail());
    }

    /**
     * Actualiza el perfil del usuario.
     */
    @Transactional
    public UserResponse updateUserProfile(String userEmail, UserUpdateRequest request) {
        UserModel user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Actualiza solo los campos permitidos
        user.setNombre(request.getNombre());

        // Guarda los cambios
        userRepository.save(user);

        // Devuelve el perfil actualizado
        return getUserProfile(userEmail);
    }



    /**
     * Agrega un animal a los favoritos del usuario.
     */
    @Transactional
    public void addFavorite(String userEmail, Long animalId) {
        UserModel user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        AnimalModel animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new RuntimeException("Animal no encontrado"));

        user.getAnimalesFavoritos().add(animal);

        userRepository.save(user);
    }

    /**
     * Devuelve la lista de animales favoritos del usuario.
     */
    // El (readOnly = true) es una optimización para consultas
    @Transactional(readOnly = true)
    public List<AnimalResponse> getFavorites(String userEmail) {
        UserModel user = userRepository.findByEmailWithFavorites(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Set<AnimalModel> favorites = user.getAnimalesFavoritos();

        return favorites.stream().map(animal -> {
            AnimalResponse res = new AnimalResponse();
            res.setId(animal.getId());
            res.setName(animal.getName());
            res.setScientificName(animal.getScientificName());
            res.setExtinction(animal.isExtinction());
            res.setImage(animal.getImage());

            if (animal.getZonaProtegida() != null) {
                res.setZonaProtegidaNombre(animal.getZonaProtegida().getNombre());
            }
            return res;
        }).collect(Collectors.toList());
    }

    /**
     * Remueve un animal de los favoritos del usuario.
     */
    @Transactional
    public void removeFavorite(String userEmail, Long animalId) {
        UserModel user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        AnimalModel animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new RuntimeException("Animal no encontrado"));

        user.getAnimalesFavoritos().remove(animal);
        userRepository.save(user);
    }
}