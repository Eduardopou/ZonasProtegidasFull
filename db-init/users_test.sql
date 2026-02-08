-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 08-02-2026 a las 04:21:20
-- Versión del servidor: 8.0.43-0ubuntu0.24.04.2
-- Versión de PHP: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `users_test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animals`
--

CREATE TABLE `animals` (
  `id` bigint NOT NULL,
  `area` varchar(255) DEFAULT NULL,
  `extinction` bit(1) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `scientific_name` varchar(255) DEFAULT NULL,
  `zona_protegida_id` bigint DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_inicio` varchar(255) DEFAULT NULL,
  `institucion` varchar(255) DEFAULT NULL,
  `investigador_principal` varchar(255) DEFAULT NULL,
  `permisos_gobierno` varchar(255) DEFAULT NULL,
  `progreso` int NOT NULL,
  `resumen` varchar(255) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `animals`
--

INSERT INTO `animals` (`id`, `area`, `extinction`, `image`, `name`, `scientific_name`, `zona_protegida_id`, `estado`, `fecha_inicio`, `institucion`, `investigador_principal`, `permisos_gobierno`, `progreso`, `resumen`, `titulo`) VALUES
(2, NULL, b'1', '/uploads-static/b86c0956-2563-4b56-b62a-c2ecc6853901-ajolote.jpg', 'Ajolote', 'Ambystoma mexicanum', 1, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(7, NULL, b'0', '/uploads-static/70b19b34-945f-45a9-8248-34ef0e248a85-Jaguar.jpg', 'Jaguar', 'Panthera onca', 1, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(8, NULL, b'1', '/uploads-static/521165a9-1a53-491f-a174-f31071d05a1e-shutterstock_152243408.jpg', 'Aguila Real', 'Aquila chrysaetos', 1, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(9, NULL, b'0', '/uploads-static/aa5ee089-edf7-46ee-8a2f-4439055e460f-licensed-image.jpeg', 'Iguana negra', 'Ctenosaura similis', 1, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(10, NULL, b'0', '/uploads-static/911c3726-8d8b-432f-9646-da3daf619556-cercosaura-sch-1-jul-casa.jpg', 'Lagartija negra', 'Cercosaura schreibersii', 1, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(13, NULL, b'0', '/uploads-static/0843d60e-79ca-4d7c-9c72-5adae59387f7-venado.jpg', 'Venado cola blanca', 'Odocoileus virginianus', 3, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `investigacion_model`
--

CREATE TABLE `investigacion_model` (
  `id` bigint NOT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_inicio` varchar(255) DEFAULT NULL,
  `institucion` varchar(255) DEFAULT NULL,
  `investigador_principal` varchar(255) DEFAULT NULL,
  `permisos_gobierno` varchar(255) DEFAULT NULL,
  `progreso` int NOT NULL,
  `resumen` varchar(255) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `zona_protegida_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `investigacion_model`
--

INSERT INTO `investigacion_model` (`id`, `estado`, `fecha_inicio`, `institucion`, `investigador_principal`, `permisos_gobierno`, `progreso`, `resumen`, `titulo`, `zona_protegida_id`) VALUES
(1, 'En Curso', 'Universidad Nacional', 'Universidad Nacional', 'Dra. Elena Mirabal', 'SEMARNAT-2023-X99', 65, 'Uso de cámaras trampa para estimar la densidad poblacional en la zona núcleo.', 'Monitoreo de la población de Jaguar (Panthera onca)', 1),
(2, 'Publicado', '2022-05-20', 'Instituto de Ecología', 'Msc. Roberto Campos', 'CONANP-2022-B12', 100, 'Análisis de estrés hídrico en especies de pino de altura.', 'Impacto del cambio climático en la flora endémica', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `nombre`, `password`, `role`, `profile_image`) VALUES
(1, 'admin@example.com', 'Administrador', '$2a$10$oU6alT3mIH2oW.Qmor61F.0Fj1p/Zt6scOmpRaeuF2SyXQ7hG0rVO', 'ROLE_ADMIN', '/uploads-static/da61e718-e2df-4fa2-9b2d-88dc9ec173d8-2378986.jpg'),
(2, 'user@example.com', 'Usuario123', '$2a$10$4cijFwAL9cc8hnoEVNe0genfViasqIV6uOlrC2hOfawW2M2RNOJwS', 'ROLE_USER', '/uploads-static/9a676f61-845f-4b34-8b0f-39d652e95c12-abstract-waves-digital-art-uhdpaper.com-4K-6.2523.jpg'),
(3, 'nuevo@example.com', 'Nuevo Usuario', '$2a$10$A5AhfEZJtKdu97qKh99mpOf5egqCrEj4UVtgO7DwNoi0TUESbxnOC', 'ROLE_USER', NULL),
(5, 'nuevo1@example.com', 'Nuevo1', '$2a$10$3vhpZ/RGg/Xpc/oMO/5a1uY3SIJNyJKtDTd5Sm4BYH0KFgRNnvPCe', 'ROLE_ADMIN', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_animal_favorites`
--

CREATE TABLE `user_animal_favorites` (
  `user_id` bigint NOT NULL,
  `animal_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `user_animal_favorites`
--

INSERT INTO `user_animal_favorites` (`user_id`, `animal_id`) VALUES
(2, 2),
(1, 8),
(1, 9),
(1, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zonas_protegidas`
--

CREATE TABLE `zonas_protegidas` (
  `id` bigint NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `ubicacion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `zonas_protegidas`
--

INSERT INTO `zonas_protegidas` (`id`, `nombre`, `ubicacion`) VALUES
(1, 'Santa Elena', 'Chihuahua'),
(2, 'Lago de Tláhuac-Xico', 'Ciudad de México'),
(3, 'Desierto de los leones', 'Ciudad de México');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkkvhtykos0s2n8e9y80p1pyk1` (`zona_protegida_id`);

--
-- Indices de la tabla `investigacion_model`
--
ALTER TABLE `investigacion_model`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKgh40k3yw1kmwjms92tq1pgoh3` (`zona_protegida_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_animal_favorites`
--
ALTER TABLE `user_animal_favorites`
  ADD PRIMARY KEY (`user_id`,`animal_id`),
  ADD KEY `FK8b1wo4m28bqcq84mcfyf0s1l6` (`animal_id`);

--
-- Indices de la tabla `zonas_protegidas`
--
ALTER TABLE `zonas_protegidas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKc84d5ia19lrorbr7o806jrxcl` (`nombre`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `animals`
--
ALTER TABLE `animals`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `investigacion_model`
--
ALTER TABLE `investigacion_model`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `zonas_protegidas`
--
ALTER TABLE `zonas_protegidas`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `animals`
--
ALTER TABLE `animals`
  ADD CONSTRAINT `FKkkvhtykos0s2n8e9y80p1pyk1` FOREIGN KEY (`zona_protegida_id`) REFERENCES `zonas_protegidas` (`id`);

--
-- Filtros para la tabla `investigacion_model`
--
ALTER TABLE `investigacion_model`
  ADD CONSTRAINT `FKgh40k3yw1kmwjms92tq1pgoh3` FOREIGN KEY (`zona_protegida_id`) REFERENCES `zonas_protegidas` (`id`);

--
-- Filtros para la tabla `user_animal_favorites`
--
ALTER TABLE `user_animal_favorites`
  ADD CONSTRAINT `FK8b1wo4m28bqcq84mcfyf0s1l6` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`),
  ADD CONSTRAINT `FKief9qiyb4gao54sqqynwe3ra1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
