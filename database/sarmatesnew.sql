-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 20 juil. 2023 à 18:46
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sarmatesnew`
--

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `ip` char(20) NOT NULL,
  `authTime` char(200) NOT NULL,
  `prenom` varchar(200) NOT NULL,
  `nom` varchar(200) NOT NULL,
  `mail` varchar(200) NOT NULL,
  `society` varchar(200) DEFAULT NULL,
  `message` mediumtext NOT NULL,
  `dateMsg` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `contacts`
--

INSERT INTO `contacts` (`id`, `ip`, `authTime`, `prenom`, `nom`, `mail`, `society`, `message`, `dateMsg`) VALUES
(13, '::1', '1689159694', 'Antonio', 'Torres', 'antonio.t350@gmail.com', '', 'message', '2023-07-12 11:01:34'),
(14, '::1', '1689160588', 'Antonio', 'Torres', 'antonio.t350@gmail.com', 'acme', 'message dsqdqsdq', '2023-07-12 11:16:28'),
(15, '::1', '1689160774', 'Antonio', 'Torres', 'antonio.t350@gmail.com', 'acme', 'PASSWORD TEST', '2023-07-12 11:19:34'),
(16, '::1', '1689161039', 'Antonio', 'Torres', 'antonio.t350@gmail.com', 'dsqd', 'pdo test', '2023-07-12 11:23:59'),
(17, '::1', '1689607538', '', '', '', '', 'message', '2023-07-17 15:20:38');

-- --------------------------------------------------------

--
-- Structure de la table `newsletter`
--

CREATE TABLE `newsletter` (
  `id` int(11) NOT NULL,
  `mail` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `newsletter`
--

INSERT INTO `newsletter` (`id`, `mail`) VALUES
(1, 'antonio.t350@gmail.com'),
(2, 'hfherz@mg.com'),
(3, 'dsqd@gmail.com'),
(4, 'dsqdqd@jl.com');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
