CREATE DATABASE VyzkumSoudyDB;

USE VyzkumSoudyDB;

CREATE TABLE User (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    userKey VARCHAR(255)
);

CREATE TABLE Admin (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255)
);

CREATE TABLE SoloTest (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    FOREIGN KEY (userID) REFERENCES User(ID)
);

CREATE TABLE DuoTest (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    userID2 INT,
    FOREIGN KEY (userID) REFERENCES User(ID),
    FOREIGN KEY (userID2) REFERENCES User(ID)
);


CREATE TABLE QOption (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT NULL,
    image TEXT NULL
);

CREATE TABLE Question (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT NULL,
    image TEXT NULL,
    correct INT,
    FOREIGN KEY (correct) REFERENCES QOption(ID)
);

CREATE TABLE QuestionQOption (
    QuestionID INT,
    OptionID INT,
    PRIMARY KEY (QuestionID, OptionID),
    FOREIGN KEY (QuestionID) REFERENCES Question(ID),
    FOREIGN KEY (OptionID) REFERENCES QOption(ID)
);

CREATE TABLE AnswerSolo (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    questionID INT,
    soloTestId INT,
    FOREIGN KEY (questionID) REFERENCES Question(ID),
    FOREIGN KEY (soloTestId) REFERENCES SoloTest(ID)
);

CREATE TABLE AnswerDuo (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    questionID INT,
    duoTestId INT,
    userId INT,
    FOREIGN KEY (questionID) REFERENCES Question(ID),
    FOREIGN KEY (duoTestId) REFERENCES DuoTest(ID),
    FOREIGN KEY (userId) REFERENCES User(ID)
);