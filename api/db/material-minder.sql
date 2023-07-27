-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2023 at 08:34 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `material-minder`
--

-- --------------------------------------------------------

--
-- Table structure for table `supplies`
--

CREATE TABLE `supplies` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `image` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'uploads/placeholder.jpg',
  `name` varchar(100) NOT NULL,
  `price` double(10,0) NOT NULL,
  `type` varchar(100) NOT NULL,
  `size` varchar(50) DEFAULT NULL,
  `location` varchar(100) NOT NULL,
  `colour` varchar(50) NOT NULL,
  `supplier` varchar(100) DEFAULT NULL,
  `total_purchased` double(10,0) NOT NULL,
  `total_used` double(10,0) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supplies`
--

INSERT INTO `supplies` (`id`, `userId`, `image`, `name`, `price`, `type`, `size`, `location`, `colour`, `supplier`, `total_purchased`, `total_used`, `notes`, `created_at`, `updated_at`) VALUES
(10, 1, 'uploads/placeholder.jpg', 'refracture test', 5, 'refracture test', '5 inches', 'refracture test', 'pink', 'refracture test', 10, 0, NULL, '2023-06-23 23:00:00', '2023-07-23 23:00:00'),
(14, 3, 'uploads/placeholder.jpg', 'delete qty test', 5, 'delete qty test', NULL, 'delete qty test', 'delete qty test', 'delete qty test', 60, 10, NULL, '2023-06-24 23:00:00', '2023-06-24 23:00:00'),
(15, 4, 'uploads/placeholder.jpg', 'type test', 2, 'elastic', NULL, 'type test', 'type test', 'type test', 10, NULL, NULL, '2023-06-24 23:00:00', '2023-06-25 13:04:15'),
(16, 5, 'uploads/placeholder.jpg', 'size test', 5, 'zip', '10 inches', 'size test', 'size test', 'size test', 20, 0, NULL, '2023-06-25 23:00:00', '2023-06-25 23:00:00'),
(17, 6, 'uploads/649995736f61b9.26422473.jpg', 'image test', 1, 'undefined', 'image test', 'image test', 'image test', 'image test', 1, NULL, NULL, '2023-06-25 23:00:00', '2023-06-26 13:41:07'),
(20, 15, 'uploads/6499a1007d1189.06859814.jpg', 'another image test', 1, 'undefined', 'another image test', 'another image test', 'another image test', 'another image test', 1, NULL, NULL, '2023-06-25 23:00:00', '2023-06-26 14:30:24'),
(39, 20, NULL, 'h edited', 1, 'thread', '1', 'test', 'h', 'test', 51, 20, 'user test edit again', '2023-07-25 23:00:00', '2023-07-25 23:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `name`, `password`) VALUES

-- Non hashed users removed for security reasons
(18, 'hash', '$2y$10$4ffhe5Xaby0UdZDPdgw7reLePt/KxRssdJhXyfr0WJi'),
(19, 'hash2', '$2y$10$lr.J8.PEuB/epEPKxrvByufWFypV9LxAKDorOH0B3u0'),
(20, 'hash3', '$2y$10$ZfAezy0zVDcbXsNU3Koobu7Gh1OZHY9eWaxGy47L3QraBYA.3kzhW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `supplies`
--
ALTER TABLE `supplies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `supplies`
--
ALTER TABLE `supplies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `supplies`
--
ALTER TABLE `supplies`
  ADD CONSTRAINT `supplies_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
