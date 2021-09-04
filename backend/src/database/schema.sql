CREATE TABLE domibase.users (
	userId int NOT NULL auto_increment,
    userEmail varchar(255) NOT NULL,
    userPassword varchar(255) NOT NULL,
    createdAt DATETIME NOT NULL default now(),
    constraint user_unique UNIQUE (userId, userEmail)
)

ALTER TABLE domibase.personais
ADD COLUMN createdAt DATETIME NOT NULL default now() AFTER pix
