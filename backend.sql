-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 192.168.1.92
-- Tiempo de generación: 11-03-2023 a las 18:38:05
-- Versión del servidor: 10.5.13-MariaDB-log
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `backend`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` char(40) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `estado`, `createAt`, `updateAt`) VALUES
('b2192b91-7971-46c0-85b7-54003d649d26', 'Caja chica', 1, '2023-03-07 06:32:02', '2023-03-07 06:32:02'),
('bba52c0a-f3c2-468b-9e9c-4d2b5220d3ce', 'Administrador', 1, '2023-01-19 21:26:16', '2023-01-19 21:26:16'),
('e60bdadc-62fd-4910-bdbe-0191661e3d8a', 'Usuario', 1, '2023-01-19 21:27:00', '2023-01-19 21:27:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` char(40) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `password` char(64) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `Rol_id` char(40) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`, `estado`, `Rol_id`, `createAt`, `updateAt`) VALUES
('4dfedf19-0729-4672-adc0-02f2f086b37f', 'syl', '$2b$10$obl8lrz1KU71mX1DHHk51uE1KkCCpRdA4fXvh8yyw7u612ZPoMxXK', 1, 'bba52c0a-f3c2-468b-9e9c-4d2b5220d3ce', '2023-03-07 21:53:47', '2023-03-07 21:53:47');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD KEY `Rol_id` (`Rol_id`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`Rol_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
