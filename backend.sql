SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
-- Base de datos: `backend`
-- --------------------------------------------------------
-- Estructura de tabla para la tabla `roles`
CREATE TABLE `roles` (
  `id` char(40) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- Volcado de datos para la tabla `roles`
INSERT INTO `roles` (`id`, `nombre`, `estado`) VALUES
('bba52c0a-f3c2-468b-9e9c-4d2b5220d3ce', 'Administrador', 1),
('e60bdadc-62fd-4910-bdbe-0191661e3d8a', 'Usuario', 1);
-- --------------------------------------------------------
-- Estructura de tabla para la tabla `usuarios`
CREATE TABLE `usuarios` (
  `id` char(40) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `password` char(64) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `Rol_id` char(40) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- Volcado de datos para la tabla `usuarios`
INSERT INTO `usuarios` (`id`, `usuario`, `password`, `estado`, `Rol_id`) VALUES
('4dfedf19-0729-4672-adc0-02f2f086b37f', 'syl', '$2b$10$obl8lrz1KU71mX1DHHk51uE1KkCCpRdA4fXvh8yyw7u612ZPoMxXK', 1, 'bba52c0a-f3c2-468b-9e9c-4d2b5220d3ce');

-- Indices de la tabla `roles`

ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

-- Indices de la tabla `usuarios`
ALTER TABLE `usuarios`
  ADD KEY `Rol_id` (`Rol_id`);

-- Filtros para la tabla `usuarios`
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`Rol_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
