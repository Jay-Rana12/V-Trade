-- FIX DATABASE SCHEMA AND ADD ADMIN USER
-- Execute this in your phpMyAdmin SQL tab or MySQL Workbench

-- 1. FIX BRANDS TABLE
ALTER TABLE `app_brands` ADD PRIMARY KEY (`id`);
ALTER TABLE `app_brands` MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

-- 2. FIX PRODUCTS TABLE
ALTER TABLE `app_products` ADD PRIMARY KEY (`id`);
ALTER TABLE `app_products` MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

-- 3. FIX BLOGS TABLE (Assuming it exists)
-- ALTER TABLE `app_blogs` ADD PRIMARY KEY (`id`);
-- ALTER TABLE `app_blogs` MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

-- 4. FIX USERS TABLE AND ADD ADMIN
-- First, ensure app_users exists
CREATE TABLE IF NOT EXISTS `app_users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(20) DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Add the requested admin user
INSERT INTO `app_users` (username, password, role) 
VALUES ('admin', 'admin123', 'superadmin')
ON DUPLICATE KEY UPDATE password='admin123';

-- 5. FIX OTHER TABLES IF THEY EXIST
-- ALTER TABLE `app_categories` ADD PRIMARY KEY (`id`);
-- ALTER TABLE `app_categories` MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

-- ALTER TABLE `app_free_joiners` ADD PRIMARY KEY (`id`);
-- ALTER TABLE `app_free_joiners` MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

-- ALTER TABLE `app_profiles` ADD PRIMARY KEY (`id`);
-- ALTER TABLE `app_profiles` MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;
