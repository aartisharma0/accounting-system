/*
SQLyog Community v13.3.1 (64 bit)
MySQL - 8.0.37 : Database - accounting_system
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`accounting_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `accounting_system`;

/*Table structure for table `account` */

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `account` */

insert  into `account`(`id`,`name`,`type`,`created_at`,`updated_at`) values 
(1,'Cash Wallet','Cash','2025-12-25 21:14:38',NULL),
(2,'Saving Account','Bank','2025-12-25 21:14:38',NULL),
(3,'Current Account','Bank','2025-12-25 21:14:38',NULL),
(4,'Credit Card','Credit Card','2025-12-25 21:14:38',NULL);

/*Table structure for table `transaction` */

DROP TABLE IF EXISTS `transaction`;

CREATE TABLE `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `type` enum('income','expense') NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_transaction_account` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `transaction` */

insert  into `transaction`(`id`,`date`,`description`,`amount`,`type`,`category`,`account_id`,`created_at`,`updated_at`) values 
(1,'2025-12-25','Salary Credited',3000.00,'income','Salary',2,'2025-12-25 21:15:15',NULL),
(2,'2025-12-26','Grocery',200.00,'expense','Grocery',1,'2025-12-25 21:15:38',NULL),
(3,'2025-12-29','Apartment Rent',500.00,'expense','Rent',2,'2025-12-25 21:16:07',NULL),
(4,'2025-12-30','Utilities',1600.00,'expense','Utilities',2,'2025-12-25 21:16:35',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
