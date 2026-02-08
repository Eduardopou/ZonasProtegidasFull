package com.example.userapi.controller;

import com.example.userapi.dto.UserResponse;
import com.example.userapi.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    /**
     * Devuelve un mensaje de bienvenida si el usuario es administrador.
     */
    @GetMapping("/profile")
    public ResponseEntity<String> getAdminMessage() {
        return ResponseEntity.ok("Bienvenido administrador");
    }

    /**
     * Devuelve la lista de usuarios, excluyendo al administrador actual.
     *
     * @param principal información del usuario autenticado
     */
    @GetMapping("/get-users")
    public ResponseEntity<List<UserResponse>> getUsers(Principal principal) {
        return adminService.findAllExcept(principal.getName());
    }

    /**
     * Elimina un usuario por su id. Solo accesible para administradores.
     */
    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id, Principal principal) {
        try {
            adminService.deleteUser(id, principal.getName());
            return ResponseEntity.ok("Usuario eliminado correctamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Promueve un usuario a rol de administrador.
     */
    @PutMapping("/promote-user/{id}")
    public ResponseEntity<String> promoteUser(@PathVariable Long id) {
        try {
            adminService.promoteToAdmin(id);
            return ResponseEntity.ok("Usuario promovido a Administrador correctamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
