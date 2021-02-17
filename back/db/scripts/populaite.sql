-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shoppingify
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,1,'Fruits'),(2,1,'Vegetable'),(3,1,'Dairy'),(4,1,'Meat and Fish');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,1,1,'Banana',NULL,'https://cosmosmagazine.com/wp-content/uploads/2020/02/190902_banannas_full-1440x813.jpg'),(2,1,1,'Cherry',NULL,'https://cdn.freshfruitportal.com/2017/08/cerezas_53336629-1024x683.jpg'),(3,1,2,'Salade',NULL,'https://fr.rc-cdn.community.thermomix.com/recipeimage/2nc1g3lr-77de7-564089-cfcd2-b67ljhi0/0d0d5043-f22b-4b08-8d9c-2578e0802b37/large/salade-verte.jpg'),(4,1,2,'Cucumber',NULL,'https://cdn.camerounweb.com/imagelib/pics/420/42003619.jpg'),(5,1,2,'Tomato',NULL,'https://www.bioalaune.com/img/article/37262-tomate-aliment-miracle-prevenir-cancer.png'),(6,1,3,'Roquefort',NULL,'https://www.produits-laitiers.com/app/uploads/2019/04/4189_VR_Roquefort-836x470.jpg');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
INSERT INTO `list` VALUES (1,1,'Normal week','IN_PROGRESS','2021-02-15 14:00:00'),(2,1,'Party','COMPLETED','2021-01-08 11:00:00'),(3,1,'Normal week','COMPLETED','2020-12-09 11:00:00');
/*!40000 ALTER TABLE `list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `list_item`
--

LOCK TABLES `list_item` WRITE;
/*!40000 ALTER TABLE `list_item` DISABLE KEYS */;
INSERT INTO `list_item` VALUES (1,1,1,5,0),(2,1,2,4,0),(3,1,3,3,0),(4,2,1,4,1),(5,2,2,3,1),(6,2,3,5,1),(7,2,4,1,1),(8,2,5,2,1),(9,2,6,4,1),(10,3,5,5,1),(11,3,4,3,1),(12,3,2,2,0),(13,3,1,1,0);
/*!40000 ALTER TABLE `list_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Imtoken12345withnumberandletters156','2021-02-02 16:00:00');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-17  8:41:08
