CREATE DATABASE  IF NOT EXISTS `shoppingify`;
USE `shoppingify`;


--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(512) NOT NULL,
  `login_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_idx` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `category_id` int NOT NULL,
  `name` varchar(256) NOT NULL,
  `note` longtext,
  `image` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_idx` (`user_id`),
  KEY `fk_category_idx` (`category_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_user_item` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
CREATE TABLE `list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(256) NOT NULL,
  `state` varchar(256) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_list_idx` (`user_id`),
  CONSTRAINT `fk_user_list` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `list_item`
--

DROP TABLE IF EXISTS `list_item`;
CREATE TABLE `list_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_list` int NOT NULL,
  `id_item` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `is_checked` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_item_idx` (`id_item`),
  KEY `fk_list_idx` (`id_list`),
  CONSTRAINT `fk_item` FOREIGN KEY (`id_item`) REFERENCES `item` (`id`),
  CONSTRAINT `fk_list` FOREIGN KEY (`id_list`) REFERENCES `list` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

