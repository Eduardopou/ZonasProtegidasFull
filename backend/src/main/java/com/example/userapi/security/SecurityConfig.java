package com.example.userapi.security;

import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.*;
import org.springframework.security.config.annotation.authentication.configuration.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Configuración principal de seguridad para la API.
 * Define reglas de acceso, CORS, filtros y codificación de contraseñas.
 */
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtFilter) throws Exception {
        return http
                // Configuración de CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // --- Rutas públicas ---
                        .requestMatchers(HttpMethod.POST,"/api/auth/login", "/api/auth/register").permitAll()
                        .requestMatchers(HttpMethod.GET, "/animal/get-animals").permitAll()
                        .requestMatchers(HttpMethod.GET, "/animal/getByZone/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/zonas/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/uploads-static/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/investigaciones/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/gemini/generate").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/gemini/test-connection").permitAll()
                        // --- Rutas solo para administradores ---
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/animal/add-animal").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/animal/update/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/admin/get-users").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/admin/delete-user/**").hasRole("ADMIN")
                        // --- Rutas para usuarios autenticados ---
                        .requestMatchers("/api/users/profile/**").hasAnyRole("ADMIN", "USER")
                        // --- Cualquier otra petición requiere autenticación ---
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // BEAN DE CONFIGURACIÓN DE CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Permite peticiones desde Angular
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));

        // Permite los métodos
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Permite las cabeceras necesarias (incluyendo Authorization para token)
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Origin"));

        // Permite que se envíen credenciales (como cookies o tokens)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplica esta configuración a TODAS las rutas de la API
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}