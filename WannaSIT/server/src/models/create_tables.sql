CREATE TABLE station (
	id INT AUTO_INCREMENT PRIMARY KEY,
	station_name VARCHAR(10) NOT NULL,
	prev_station_time SMALLINT NOT NULL,
	next_station_time SMALLINT NOT NULL,
	station_info TEXT NOT NULL,
	passenger_info TEXT NOT NULL
);
CREATE TABLE train (
	id INT AUTO_INCREMENT PRIMARY KEY,
	station_id INT NOT NULL,
	direction TINYINT NOT NULL,
	arrival_day CHAR(3) NOT NULL,
	arrival_hour TINYINT NOT NULL
	arrival_min TINYINT NOT NULL,
	get_off_count MEDIUMINT NOT NULL
);
CREATE TABLE car (
	id INT AUTO_INCREMENT PRIMARY KEY,
	train_id INT NOT NULL,
	estimated_count SMALLINT NOT NULL
);
CREATE TABLE post (
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id CHAR(36) NOT NULL,
	username VARCHAR(100) NOT NULL,
	title VARCHAR(100) NOT NULL,
	content VARCHAR(500) NOT NULL,
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	like_count MEDIUMINT NOT NULL DEFAULT 0
);
CREATE TABLE comment (
	id INT AUTO_INCREMENT PRIMARY KEY,
	post_id INT NOT NULL,
	user_id CHAR(36) NOT NULL,
	username VARCHAR(100) NOT NULL,
	content VARCHAR(200) NOT NULL,
	creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	like_count MEDIUMINT NOT NULL DEFAULT 0
);