
CREATE TABLE `user` (
	`user_id` int NOT NULL AUTO_INCREMENT,
	`first_name` varchar(150) NOT NULL,
	`last_name` varchar(150) NOT NULL,
	`birthdate` DATE NULL,
  `nationality` varchar(200) NOT NULL,
  `driving_license` varchar(50) NOT NULL,
  `linkedin` varchar(100) NULL UNIQUE,
	`email` varchar(100) NOT NULL UNIQUE,
  `password` varchar(100) NOT NULL,
	`phone` varchar(15) NULL,
	`address` varchar(150) NULL,
  `zip_code` varchar(16) NULL,
  `municipality` varchar(90) NULL,
	`city` varchar(50) NULL,
	`country` varchar(50) NULL,
	`profil` text NULL,
  `pictures` varchar(512) NULL,
	PRIMARY KEY (`user_id`)
);

CREATE TABLE `language_level` (
  `language_level_id` int NOT NULL AUTO_INCREMENT,
  `language_level_name` varchar(40) NOT NULL,
  PRIMARY KEY (`language_level_id`)
);

CREATE TABLE `languages` (
  `language_id` int NOT NULL AUTO_INCREMENT,
  `language_name` varchar(150) NOT NULL,
  `language_level_id` int NOT NULL,
  `user_id` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
  FOREIGN KEY (`language_level_id`) REFERENCES `language_level`(`language_level_id`),
  PRIMARY KEY (`language_id`)
);

CREATE TABLE `skill_level` (
  `skill_level_id` int NOT NULL AUTO_INCREMENT,
  `skill_level_name` varchar(30) NOT NULL,
  PRIMARY KEY (`skill_level_id`)
);

CREATE TABLE `skills` (
  `skill_id` int NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(150) NOT NULL,
  `skill_level_id` int NOT NULL,
  `user_id` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
  FOREIGN KEY (`skill_level_id`) REFERENCES `skill_level`(`skill_level_id`),
  PRIMARY KEY (`skill_id`)
);

CREATE TABLE `education_level` (
  `education_level_id` int NOT NULL AUTO_INCREMENT,
  `education_level_name` varchar(40) NOT NULL,
  PRIMARY KEY (`education_level_id`)
);

CREATE TABLE `education` (
	`education_id` int NOT NULL AUTO_INCREMENT,
  `education_level_id` int NOT NULL,
	`title_name` varchar(150) NOT NULL,
	`year_start` DATE NOT NULL,
	`year_end` DATE NOT NULL,
	`university` varchar(100) NOT NULL UNIQUE,
	`city` varchar(50) NOT NULL,
	`country` varchar(50) NOT NULL,
	`description` text NOT NULL,
  `user_id` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
  FOREIGN KEY (`education_level_id`) REFERENCES `education_level`(`education_level_id`),
	PRIMARY KEY (`education_id`)
);

CREATE TABLE `work_experience` (
	`work_experience_id` int NOT NULL AUTO_INCREMENT,
	`title_name_wke` varchar(150) NOT NULL,
	`year_start_wke` DATE NOT NULL,
	`year_end_wke` DATE NOT NULL,
	`company_name` varchar(100) NOT NULL UNIQUE,
	`city_wke` varchar(50) NOT NULL,
	`country_wke` varchar(50) NOT NULL,
	`description_wke` text NOT NULL,
  `user_id` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
	PRIMARY KEY (`work_experience_id`)
);


CREATE TABLE `work_references` (
  `work_references_id` int NOT NULL AUTO_INCREMENT,
  `reference_person` varchar(500) NOT NULL,
  `company_name_ref` varchar(50) NOT NULL,
  `email_ref` varchar(100) NOT NULL UNIQUE,
	`phone_ref` varchar(15) NOT NULL,
  `user_id` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
  PRIMARY KEY (`work_references_id`)
);


