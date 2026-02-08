package com.example.userapi.controller;

import com.example.userapi.dto.JwtResponse;
import com.example.userapi.dto.LoginRequest;
import com.example.userapi.dto.RegisterRequest;
import com.example.userapi.model.UserModel;
import com.example.userapi.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Autentica a un usuario y devuelve un JWT si las credenciales son correctas.
     */
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest request) {
        JwtResponse jwt = authService.login(request);
        return ResponseEntity.ok(jwt);
    }

    /**
     * Registra un nuevo usuario en el sistema.
     */
    @PostMapping("/register")
    public ResponseEntity<UserModel> register(@Valid @RequestBody RegisterRequest request) {
        UserModel newUser = authService.register(request);
        return ResponseEntity.status(201).body(newUser);
    }
}