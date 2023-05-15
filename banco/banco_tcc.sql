-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 15-Maio-2023 às 02:37
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `banco_tcc`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `user_id` int(5) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_nick` varchar(20) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_senha` varchar(250) NOT NULL,
  `user_dtnasc` date NOT NULL,
  `user_sexo` varchar(10) NOT NULL,
  `user_endereco` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`user_id`, `user_name`, `user_nick`, `user_email`, `user_senha`, `user_dtnasc`, `user_sexo`, `user_endereco`) VALUES
(0, 'João Pedro Garcia Girotto', 'JP1005YT', 'godlolpro32@gmail.com', '$2y$10$CdEjjtawfs0ceevxBpprietgehAsbiFS6tb/d3QNqHBdkT0KeL2TK', '2006-01-04', 'Masculino', '19064145'),
(7, 'ROBS', 'ROBS', 'ROBS', '$2y$10$ytFu.6NRB/ytL89KU.kfwut4jGoIX6MA5APvABEshmb6v0MGsKL2e', '2006-01-04', 'Masculino', '19064145'),
(8, 'KAPA', 'KAPA', 'KAPA', '$2y$10$OBbhYSlWTct5AzGdUV0PAeTC3g1aG38Ykn1aNyiMYXw4wlMDVTYKC', '2006-01-04', 'Feminino', '19064145');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
