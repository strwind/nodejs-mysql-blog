-- WampServer Version 2.2
-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 05 月 19 日 09:37
-- 服务器版本: 5.5.24-log
-- PHP 版本: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `blog_mysql`
--

-- --------------------------------------------------------

--
-- 表的结构 `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `title` text NOT NULL,
  `post` text NOT NULL,
  `time` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='博客内容表' AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `posts`
--

INSERT INTO `posts` (`id`, `user`, `title`, `post`, `time`) VALUES
(1, '111', '111111111', '111111111111', '2013-05-19'),
(2, '111', 'aa', 'aaaaaaaaaaaaaaa', '2013-05-19'),
(3, '111', 'bbb', 'bbbbbbbbbbbbbb', '2013-05-19'),
(4, '111', 'ccc', 'cccccccccccc', '2013-05-19'),
(5, '222', 'ddd', 'ddddddddddddddd', '2013-05-19');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `name`, `password`) VALUES
(9, '333', 'MQ3Lv0zOYvdioqqhSNVWvQ=='),
(10, '111', 'aY1RoZ2KEhzlgUmde3AWaA=='),
(11, '222', 'vL4zZeasleosA0OiOVg03Q==');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
