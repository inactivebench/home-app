CREATE DATABASE homedb;

CREATE TABLE customer (
  customer_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
customer_fname VARCHAR(50) NOT NULL,
customer_lname VARCHAR(50) NOT NULL,
  customer_email VARCHAR(50) NOT NULL UNIQUE, CHECK(customer_email like '%@%.%'),
  `password` VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15) NOT NULL UNIQUE
 
);


CREATE TABLE property (
property_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
property_title VARCHAR(50) NOT NULL,
property_location VARCHAR(50) NOT NULL,
property_image_url VARCHAR(255),
property_price DECIMAL(8,2) NOT NULL DEFAULT 0,
no_of_beds INTEGER,
no_of_baths INTEGER,
property_description TEXT,
property_owner_name VARCHAR(50) NOT NULL,
property_owner_contact VARCHAR(15) NOT NULL UNIQUE

);

CREATE TABLE search_history (
search_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
customer_id INTEGER NOT NULL,
search_criteria VARCHAR(50) NOT NULL,
timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE comment(
comment_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
customer_id INTEGER NOT NULL,
property_id INTEGER NOT NULL,
rating INTEGER NOT NULL,
comment TEXT NOT NULL,
timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
FOREIGN KEY (property_id) REFERENCES property(property_id)
);


-- add property and property owner foreign keys

ALTER TABLE property
    ADD property_owner_id INTEGER,
    ADD FOREIGN KEY(property_owner_id) REFERENCES property_owner(property_owner_id);


ALTER TABLE property_owner
    ADD property_id INTEGER,
    ADD FOREIGN KEY(property_id) REFERENCES property(property_id);

-- CREATE TABLE property_owner (
--   property_owner_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
-- property_owner_name VARCHAR(50) NOT NULL,
-- `password` VARCHAR(255) NOT NULL UNIQUE,
--  phone_number VARCHAR(15) NOT NULL UNIQUE
  
-- );