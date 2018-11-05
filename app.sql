/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : app

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 05/11/2018 17:07:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for organize
-- ----------------------------
DROP TABLE IF EXISTS `organize`;
CREATE TABLE `organize`  (
  `id` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `isshow` int(1) UNSIGNED ZEROFILL NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of organize
-- ----------------------------
INSERT INTO `organize` VALUES ('366d5b25cc474a9785d6b1a671eb73fc', 'fff', '', 0);
INSERT INTO `organize` VALUES ('a2b0a65baf844c5880729c18462cf180', 'asdfasdf', '', 0);
INSERT INTO `organize` VALUES ('b6d4ff57b63d4d5e8a90a6622972c004', 'asdfasdfa', '', 0);
INSERT INTO `organize` VALUES ('ea994a59cf454d0d8b01f4d1c9d310b4', 'aaa', '', 0);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `orgid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2045735bdc0911e89a9b64006a7a245e', 'admin', 'admin', 'db69fc039dcbd2962cb4d28f5891aae1', NULL);
INSERT INTO `user` VALUES ('452598039705436b89d7c85aadb4accc', '超级管理员', 'aaa', '139d4d4c22c2b25585b0bda8dd2591cd', 'ea994a59cf454d0d8b01f4d1c9d310b4');
INSERT INTO `user` VALUES ('62580283acdd46208cc67a21b8f44820', '超级管理员', 'fff', '1e500a0f1e7dddfb3e58fe2ed796e550', '366d5b25cc474a9785d6b1a671eb73fc');
INSERT INTO `user` VALUES ('94b65ee2bcfa4e6e8d18f0a8c0ecf8c7', '超级管理员', 'asdfasdf', '6fd742a61bd034804c00c49b18045020', 'a2b0a65baf844c5880729c18462cf180');
INSERT INTO `user` VALUES ('ee45d962cc2645e493c13254492607f8', '超级管理员', '123', '6fd742a61bd034804c00c49b18045020', 'b6d4ff57b63d4d5e8a90a6622972c004');

SET FOREIGN_KEY_CHECKS = 1;
