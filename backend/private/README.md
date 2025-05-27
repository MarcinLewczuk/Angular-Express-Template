# How to populate this folder

Since this is a private folder, the information here is to be personalised to your project and must use your own database connection, you must be currently connected to the db through terminal or MySQL Workbench. I created this project and hosted it using <a href="https://www.oracle.com/uk/cloud/">Oracle Cloud Infrastructure</a>.

<strong>IMPORTANT NOTE: Add this folder to .gitignore if you decide to clone the repo and upload it.</strong>

### Private folder to be populated with a .env file in the format of:
<strong><> = Placeholders</strong>

DB_HOST=<Hostname>
DB_PORT=<Port>
DB_USER=<Username>
DB_PASS=<User Password>
DB_NAME=<Database Name>
PORT=3000 <-- <strong>This is the default express middleware port, not to be changed.</strong>

---

### Database Schema:

CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `long_description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `image_url` varchar(2083) DEFAULT NULL,
  `date_added` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci