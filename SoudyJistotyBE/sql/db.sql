USE VyzkumSoudyDB;

CREATE TABLE UserGroup (
    groupId INT AUTO_INCREMENT PRIMARY KEY,
    groupName VARCHAR(255),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    allowRegistration BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT FALSE
);

CREATE TABLE User (
    userKey VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    gender BOOLEAN, -- 1 jsou zeny
    icon VARCHAR(255) NULL,
    soloTestVariant VARCHAR(255) DEFAULT 'A',
    duoTestVariant VARCHAR(255) DEFAULT 'B',
    soloTestQuestions VARCHAR(1000) DEFAULT '[]',
    duoTestQuestions VARCHAR(1000) DEFAULT '[]',
    soloTestVariantOrder VARCHAR(255) DEFAULT '["bool", "alltext", "anatext", "image"]',
    duoTestVariantOrder VARCHAR(255) DEFAULT '["alltext", "bool", "anatext", "image"]',
    currentVariant VARCHAR(255) NULL,
    botVariant VARCHAR(255) NULL,
    groupId INT NULL,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (groupId) REFERENCES UserGroup(groupId)
);

CREATE TABLE Admin (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    variant VARCHAR(255)
);

CREATE TABLE SoloTest (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(255),
    variant VARCHAR(255) NULL,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(userKey)
);

CREATE TABLE DuoTest (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userId VARCHAR(255),
    userId2 VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES User(userKey),
    FOREIGN KEY (userId2) REFERENCES User(userKey)
);

CREATE TABLE QOption (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content TEXT NULL
);

CREATE TABLE Question (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    questionType TEXT NULL,
    description TEXT NULL,
    firstWord TEXT NULL,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(255), -- bool, alltext, anatext, image, emo,
    variant VARCHAR(255), -- 'A', 'B'
    option1 INT, -- correct answer
    option2 INT, -- second best
    option3 INT NULL,
    option4 INT NULL,
    FOREIGN KEY (option1) REFERENCES QOption(ID),
    FOREIGN KEY (option2) REFERENCES QOption(ID),
    FOREIGN KEY (option3) REFERENCES QOption(ID),
    FOREIGN KEY (option4) REFERENCES QOption(ID)
);

CREATE TABLE AnswerSolo (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    wasCorrect BOOLEAN, -- option1
    secondBest BOOLEAN, -- option2
    answer TEXT,
    trustScale INT,
    questionId INT,
    soloTestId INT,
    userId VARCHAR(255),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (questionId) REFERENCES Question(ID),
    FOREIGN KEY (soloTestId) REFERENCES SoloTest(ID),
    FOREIGN KEY (userId) REFERENCES User(userKey)
);