package com.example.userapi.service;

import com.example.userapi.dto.LoginRequest;
import com.example.userapi.dto.JwtResponse;
import com.example.userapi.dto.RegisterRequest;
import com.example.userapi.model.UserModel;
import com.example.userapi.repository.UserRepository;
import com.example.userapi.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsService userDetailsService;

    //Repositorio para trabajar con la base de datos
    @Autowired
    private UserRepository userRepository;
    //Encriptar las passwords
    @Autowired
    private PasswordEncoder passwordEncoder;

    public JwtResponse login(LoginRequest request) {
        // Autenticar usuario
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        );
        authManager.authenticate(authentication);

        // Cargar usuario
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

        // Generar token
        String token = jwtUtils.generateToken(userDetails);

        // Obtener roles del usuario
        List<String> roles = userDetails.getAuthorities().stream()
                .map(authority -> authority.getAuthority())
                .toList();

        // Retornar respuesta completa
        return new JwtResponse(
                token,
                "Login success!",
                userDetails.getUsername(),
                roles
        );
    }


    public UserModel register(RegisterRequest request) {
        // Verifica si el email ya está en uso
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Error: El email ya está en uso.");
        }

        // Crea una nueva instancia de UserModel
        UserModel user = new UserModel();
        user.setNombre(request.getNombre());
        user.setEmail(request.getEmail());
        // Codifica la contraseña antes de guardarla
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        // Asigna un rol por defecto a los nuevos usuarios
        user.setRole("ROLE_USER");

        // Guarda el nuevo usuario en la base de datos
        return userRepository.save(user);
    }

}
