
CREATE DATABASE finance_super_app;

USE finance_super_app;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255),
  phone_number VARCHAR(50),
  whatsapp_jid VARCHAR(255),
  dashboard_token TEXT,
  ai_score INT DEFAULT 82,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  description TEXT,
  amount BIGINT,
  type VARCHAR(20),
  category VARCHAR(100),
  sub_category VARCHAR(100),
  source VARCHAR(50),
  transaction_date DATETIME
);

CREATE TABLE budgets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  category VARCHAR(100),
  amount BIGINT
);

CREATE TABLE goals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  target_amount BIGINT,
  current_amount BIGINT DEFAULT 0
);

CREATE TABLE subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(255),
  amount BIGINT
);
