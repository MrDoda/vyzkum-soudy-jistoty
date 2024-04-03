CREATE DATABASE VyzkumSoudyDB;
USE VyzkumSoudyDB;

CREATE TABLE UserGroup (
    groupId INT AUTO_INCREMENT PRIMARY KEY,
    groupName VARCHAR(255),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    allowRegistration BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT FALSE,
    activeDuo BOOLEAN DEFAULT FALSE
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
    botVariant VARCHAR(255) NULL,
    seeAnswers BOOLEAN DEFAULT FALSE,
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
    FOREIGN KEY (userId) REFERENCES User(userKey)
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
    answerId INT,
    trustScale INT,
    questionId INT,
    soloTestId INT,
    userId VARCHAR(255),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (questionId) REFERENCES Question(ID),
    FOREIGN KEY (soloTestId) REFERENCES SoloTest(ID),
    FOREIGN KEY (answerId) REFERENCES QOption(ID),
    FOREIGN KEY (userId) REFERENCES User(userKey)
);

CREATE TABLE BOT (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    variant VARCHAR(255),
    confidence INT,
    competence INT,
    answers VARCHAR(1000),
    userId VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES User(userKey)
);

CREATE TABLE AnswerDuo (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    wasCorrect BOOLEAN, -- option1
    secondBest BOOLEAN, -- option2
    wasMatch BOOLEAN DEFAULT FALSE,
    isFinal BOOLEAN DEFAULT FALSE,
    try INT,
    answer TEXT,
    answerId INT,
    trustScale INT,
    questionId INT,
    wasBotCorrect Boolean,
    botAnswerId INT,
    botId INT,
    duoTestId INT,
    userId VARCHAR(255),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (questionId) REFERENCES Question(ID),
    FOREIGN KEY (duoTestId) REFERENCES DuoTest(ID),
    FOREIGN KEY (answerId) REFERENCES QOption(ID),
    FOREIGN KEY (botAnswerId) REFERENCES QOption(ID),
    FOREIGN KEY (userId) REFERENCES User(userKey),
    FOREIGN KEY (botId) REFERENCES BOT(ID)
);

INSERT INTO Admin (password, variant) VALUES ('879500', 'default');

USE VyzkumSoudyDB;

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Ekonomie', 'Inflace znamená pokles cenové hladiny v ekonomice', 1, 2, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Historie', 'Berlínská zeď byla stržena v roce 1989', 3, 4, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Psychologie', 'Maslowova hierarchie potřeb začíná na nejnižší úrovni fyziologickými potřebami.', 5, 6, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Sociologie', 'Max Weber definoval stát jako entitu, která má monopol na legitimní použití fyzické síly', 7, 8, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Literatura', '"Válka a mír" byl napsán Levem Tolstojem', 9, 10, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Filozofie', 'Descartes je známý svým výrokem "Myslím, tedy jsem".', 11, 12, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Geografie', 'Mount Everest je nejvyšší horou světa', 13, 14, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Astronomie', 'Slunce je největší hvězdou v naší galaxii', 15, 16, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Politologie', 'Většinový volební systém zaručuje rovnou reprezentaci všech politických stran', 17, 18, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Právo', 'Common law je právní systém založený na precedentech', 19, 20, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Ekologie', 'Ozone Layer se nachází v troposféře', 21, 22, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Fyzika', 'Entropie v izolovaném systému se může snížit', 23, 24, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Chemie', 'Vodík má atomové číslo 1', 25, 26, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Biologie', 'Krevní skupiny byly objeveny Karlem Landsteinerem', 27, 28, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Informatika', 'TCP/IP je protokol používaný pro přenos dat v internetu', 29, 30, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Matematika', 'Nula je považována za kladné číslo', 31, 32, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Fyzika', 'Zákon zachování energie platí v uzavřených systémech', 33, 34, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Chemie', 'Všechny plyny mají stejnou hustotu za standardních podmínek', 35, 36, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Biologie', 'Mitóza je proces, při kterém dochází k vzniku pohlavních buněk', 37, 38, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Informatika', 'Linux je příkladem operačního systému založeného na Windows', 39, 40, 'bool', 'B');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Matematika', 'Každá funkce, která je spojitá na uzavřeném intervalu, má na tomto intervalu maximum a minimum', 41, 42, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Fyzika', 'Energie fotonu je přímo úměrná jeho vlnové délce', 43, 44, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Chemie', 'Voda má nejvyšší hustotu přibližně při teplotě 4 °C', 45, 46, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Biologie', 'DNA obsahuje aminokyseliny', 47, 48, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Informatika', 'Algoritmus quicksort je příkladem algoritmu typu "rozděl a panuj"', 49, 50, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Ekonomie', 'Hrubý domácí produkt (HDP) je nejlepším ukazatelem celkového zdraví ekonomiky', 51, 52, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Historie', 'Průmyslová revoluce začala ve Velké Británii v 18. století', 53, 54, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('PSychologie', 'Freudova teorie psychoanalýzy zdůrazňuje význam nevědomých procesů v lidském chování', 55, 56, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Sociologie', 'Sociální stratifikace je vždy založena na ekonomickém bohatství', 57, 58, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Literatura', 'Shakespeare napsal "Sto let samoty"', 59, 60, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Filozofie', 'Platón byl žákem Sókrata', 61, 62, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Geografie', 'Nejdelší řekou na světě je Amazonka', 63, 64, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Astronomie', 'Mars je známý jako "Červená planeta" kvůli vysokému obsahu železa na svém povrchu.', 65, 66, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Politologie', 'Většinový volební systém obvykle vede k vytváření dvou dominantních politických stran', 67, 68, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Právo', 'Ve většině zemí je občanské právo založeno na římském právu', 69, 70, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Ekologie', 'Globální oteplování je způsobeno výhradně přirozenými procesy', 71, 72, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Fyzika', 'Teorie relativity byla formulována Albertem Einsteinem', 73, 74, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Chemie', 'Všechny kyseliny mají pH nižší než 7', 75, 76, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Biologie', 'Fotosyntéza se odehrává v mitochondriích', 77, 78, 'bool', 'A');

INSERT INTO QOption (content) VALUES ('FALSE');
INSERT INTO QOption (content) VALUES ('TRUE');
INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('Informatika', 'HTML je programovací jazyk', 79, 80, 'bool', 'A');

USE VyzkumSoudyDB;

INSERT INTO QOption (content) VALUES ('6');
INSERT INTO QOption (content) VALUES ('9');
INSERT INTO QOption (content) VALUES ('3');
INSERT INTO QOption (content) VALUES ('12');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Matematika', 'Co je derivace funkce f(x) = x^2 v bodě x = 3?', 81, 82, 83, 84, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Ohmův zákon');
INSERT INTO QOption (content) VALUES ('Newtonův zákon');
INSERT INTO QOption (content) VALUES ('Jouleův zákon');
INSERT INTO QOption (content) VALUES ('Faradayův zákon');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Fyzika', 'Jaký je název fyzikálního zákona, který popisuje vztah mezi elektrickým proudem, napětím a odporem?', 85, 86, 87, 88, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Kyslík');
INSERT INTO QOption (content) VALUES ('Zlato');
INSERT INTO QOption (content) VALUES ('Ozon');
INSERT INTO QOption (content) VALUES ('Osmium');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Chemie', 'Který prvek má chemickou značku O?', 89, 90, 91, 92, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Játra');
INSERT INTO QOption (content) VALUES ('Ledviny');
INSERT INTO QOption (content) VALUES ('Srdce');
INSERT INTO QOption (content) VALUES ('Slinivka');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Biologie', 'Jaký orgán je primárně zodpovědný za detoxikaci krve?', 93, 94, 95, 96, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Python');
INSERT INTO QOption (content) VALUES ('C');
INSERT INTO QOption (content) VALUES ('HTML');
INSERT INTO QOption (content) VALUES ('Assembly');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Informatika', 'Který z následujících jazyků je objektově orientovaný?', 97, 98, 99, 100, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Zvýšení cen zboží a služeb');
INSERT INTO QOption (content) VALUES ('Pokles hodnoty peněz');
INSERT INTO QOption (content) VALUES ('Pokles nezaměstnanosti');
INSERT INTO QOption (content) VALUES ('Zvýšení hodnoty akcií');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Ekonomie', 'Co je definice inflace?', 101, 102, 103, 104, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Deklarace nezávislosti');
INSERT INTO QOption (content) VALUES ('Magna Charta');
INSERT INTO QOption (content) VALUES ('Versailleská smlouva');
INSERT INTO QOption (content) VALUES ('Nürnberské zákony');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Historie', 'Který historický dokument byl podepsán v roce 1215?', 105, 106, 107, 108, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Sigmund Freud');
INSERT INTO QOption (content) VALUES ('Carl jung');
INSERT INTO QOption (content) VALUES ('Ivan Pavlov');
INSERT INTO QOption (content) VALUES ('Jean Piaget');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Psychologie', 'Kdo je považován za zakladatele psychoanalýzy?', 109, 110, 111, 112, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Mezilidské vztahy a interakce');
INSERT INTO QOption (content) VALUES ('Globální sociální procesy');
INSERT INTO QOption (content) VALUES ('Strukturu společnosti');
INSERT INTO QOption (content) VALUES ('Historický vývoj společenských institucí');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Sociologie', 'Co zkoumá mikrosociologie?', 113, 114, 115, 116, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('George Orwell');
INSERT INTO QOption (content) VALUES ('Aldous Huxley');
INSERT INTO QOption (content) VALUES ('J.R.R. Tolkien');
INSERT INTO QOption (content) VALUES ('Ernest Hemingway');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Literatura', 'Kdo napsal "1984"?', 117, 118, 119, 120, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Immanuel Kant');
INSERT INTO QOption (content) VALUES ('Friedrich Nietzsche');
INSERT INTO QOption (content) VALUES ('Søren Kierkegaard');
INSERT INTO QOption (content) VALUES ('David Hume');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Filozofie', 'Kdo je autorem "Kritiky čistého rozumu"?', 121, 122, 123, 124, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Rusko');
INSERT INTO QOption (content) VALUES ('Čína');
INSERT INTO QOption (content) VALUES ('Kanada');
INSERT INTO QOption (content) VALUES ('Spojené státy americké');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Geografie', 'Který stát má největší rozlohu na světě?', 125, 126, 127, 128, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Merkur');
INSERT INTO QOption (content) VALUES ('Mars');
INSERT INTO QOption (content) VALUES ('Venuše');
INSERT INTO QOption (content) VALUES ('Země');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Astronomie', 'Která planeta je nejblíže Slunci?', 129, 130, 131, 132, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Vláda mnoha');
INSERT INTO QOption (content) VALUES ('Vláda několika');
INSERT INTO QOption (content) VALUES ('Vláda jednoho');
INSERT INTO QOption (content) VALUES ('Vláda nikoho');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Politologie', 'Co je demokracie?', 133, 134, 135, 136, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Právo na osobní svobodu');
INSERT INTO QOption (content) VALUES ('Právo na svobodu slova');
INSERT INTO QOption (content) VALUES ('Právo na právního zástupce');
INSERT INTO QOption (content) VALUES ('Právo na spravedlivý proces');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Právo', 'Co je habeas corpus?', 137, 138, 139, 140, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Emise skleníkových plynů');
INSERT INTO QOption (content) VALUES ('Znečištění vod');
INSERT INTO QOption (content) VALUES ('Přirozené klimatické změny');
INSERT INTO QOption (content) VALUES ('Nadměrné využívání fosilních paliv');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Ekologie', 'Co je hlavní příčinou globálního oteplování?', 141, 142, 143, 144, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Studium chování malých částic');
INSERT INTO QOption (content) VALUES ('Studium pohybu planet');
INSERT INTO QOption (content) VALUES ('Studium pohybu velkých objektů');
INSERT INTO QOption (content) VALUES ('Studium gravitačních sil');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Fyzika', 'Co je kvantová mechanika?', 145, 146, 147, 148, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Seznam všech známých prvků');
INSERT INTO QOption (content) VALUES ('Seznam chemických reakcí');
INSERT INTO QOption (content) VALUES ('Seznam všech organických sloučenin');
INSERT INTO QOption (content) VALUES ('Seznam všech anorganických sloučenin');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Chemie', 'Co je periodická tabulka?', 149, 150, 151, 152, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Transkripce');
INSERT INTO QOption (content) VALUES ('Replikace DNA');
INSERT INTO QOption (content) VALUES ('Translace');
INSERT INTO QOption (content) VALUES ('Mitóza');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Biologie', 'Který z následujících procesů je zodpovědný za přenos genetické informace z DNA do mRNA?', 153, 154, 155, 156, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Software, který řídí hardware počítače');
INSERT INTO QOption (content) VALUES ('Sada nástrojů pro vývoj softwaru');
INSERT INTO QOption (content) VALUES ('Program pro zpracování textu');
INSERT INTO QOption (content) VALUES ('Databázový systém');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Informatika', 'Co je operační systém?', 157, 158, 159, 160, 'alltext', 'B');

INSERT INTO QOption (content) VALUES ('Pokles cenové hladiny v ekonomice');
INSERT INTO QOption (content) VALUES ('Zvýšení hodnoty peněz');
INSERT INTO QOption (content) VALUES ('Zvýšení cen zboží a služeb');
INSERT INTO QOption (content) VALUES ('Pokles hodnoty akcií');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Ekonomie', 'Co je deflace?', 161, 162, 163, 164, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('George Washington');
INSERT INTO QOption (content) VALUES ('Abraham Lincoln');
INSERT INTO QOption (content) VALUES ('Thomas Jefferson');
INSERT INTO QOption (content) VALUES ('John Adams');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Historie', 'Kdo byl prvním prezidentem Spojených států amerických?', 165, 166, 167, 168, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Konflikt mezi vlastními přesvědčeními a chováním');
INSERT INTO QOption (content) VALUES ('Schopnost řešit problémy');
INSERT INTO QOption (content) VALUES ('Proces zapomínání');
INSERT INTO QOption (content) VALUES ('Schopnost učit se novým věcem');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Psychologie', 'Co je kognitivní disonance?', 169, 170, 171, 172, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Nedostatek společenských norem');
INSERT INTO QOption (content) VALUES ('Společenská stabilita');
INSERT INTO QOption (content) VALUES ('Vysoká míra sociální integrace');
INSERT INTO QOption (content) VALUES ('Přísné dodržování pravidel');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Sociologie', 'Co je anomie?', 173, 174, 175, 176, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Fjodor Dostojevskij');
INSERT INTO QOption (content) VALUES ('Leo Tolstoy');
INSERT INTO QOption (content) VALUES ('Anton Čechov');
INSERT INTO QOption (content) VALUES ('Vladimir Nabokov');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Literatura', 'Kdo napsal "Bratry Karamazovy"?', 177, 178, 179, 180, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Etická teorie založená na principu potěšení');
INSERT INTO QOption (content) VALUES ('Filozofický směr zdůrazňující důležitost vůle');
INSERT INTO QOption (content) VALUES ('Etická teorie založená na dodržování povinností');
INSERT INTO QOption (content) VALUES ('Filozofický směr zaměřený na existenciální otázky');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Filozofie', 'Co je utilitarismus?', 181, 182, 183, 184, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Nil');
INSERT INTO QOption (content) VALUES ('Kongo');
INSERT INTO QOption (content) VALUES ('Zambezi');
INSERT INTO QOption (content) VALUES ('Niger');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Geografie', 'Která řeka je nejdelší v Africe?', 185, 186, 187, 188, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Planeta mimo naši sluneční soustavu');
INSERT INTO QOption (content) VALUES ('Nejmenší planeta ve sluneční soustavě');
INSERT INTO QOption (content) VALUES ('Planeta bez atmosféry');
INSERT INTO QOption (content) VALUES ('Umělá planeta vytvořená lidmi');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Astronomie', 'Co je exoplaneta?', 189, 190, 191, 192, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Forma vlády s omezenou mocí');
INSERT INTO QOption (content) VALUES ('Demokratický systém vlády');
INSERT INTO QOption (content) VALUES ('Politický systém s neomezenou mocí vlády');
INSERT INTO QOption (content) VALUES ('Systém vlády založený na tradičních hodnotách');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Politologie', 'Co je totalitarismus?', 193, 194, 195, 196, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Rozhodnutí soudu, které slouží jako vzor pro budoucí případy');
INSERT INTO QOption (content) VALUES ('Zákon schválený parlamentem');
INSERT INTO QOption (content) VALUES ('Právní názor vyjádřený expertem');
INSERT INTO QOption (content) VALUES ('Základní právo zaručené ústavou');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Právo', 'Co je právní precedent?', 197, 198, 199, 200, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Celkové množství organismů v ekosystému');
INSERT INTO QOption (content) VALUES ('Typ fosilního paliva');
INSERT INTO QOption (content) VALUES ('Znečištění způsobené průmyslem');
INSERT INTO QOption (content) VALUES ('Přírodní zdroj energie');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Ekologie', 'Co je biomasa?', 201, 202, 203, 204, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Schopnost materiálů vést elektrický proud bez odporu');
INSERT INTO QOption (content) VALUES ('Vlastnost materiálů vysílat světlo při nízkých teplotách');
INSERT INTO QOption (content) VALUES ('Extrémní magnetická vlastnost některých materiálů');
INSERT INTO QOption (content) VALUES ('Vysoká tepelná vodivost materiálů');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Fyzika', 'Co je superkonduktivita?', 205, 206, 207, 208, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Ztráta elektronů během chemické reakce');
INSERT INTO QOption (content) VALUES ('Získání elektronů během chemické reakce');
INSERT INTO QOption (content) VALUES ('Ztráta protonů během chemické reakce');
INSERT INTO QOption (content) VALUES ('Získání neutronů během chemické reakce');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Chemie', 'Co je oxidace?', 209, 210, 211, 212, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Proces dělení somatických buněk');
INSERT INTO QOption (content) VALUES ('Proces buněčné smrti');
INSERT INTO QOption (content) VALUES ('Proces tvorby pohlavních buněk');
INSERT INTO QOption (content) VALUES ('Proces syntézy DNA');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Biologie', 'Co je mitóza?', 213, 214, 215, 216, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Poskytování výpočetních služeb přes internet');
INSERT INTO QOption (content) VALUES ('Zpracování dat pomocí kvantových počítačů');
INSERT INTO QOption (content) VALUES ('Ukládání dat na fyzických serverech');
INSERT INTO QOption (content) VALUES ('Vývoj softwaru pro mobilní zařízení');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Informatika', 'Co je cloud computing?', 217, 218, 219, 220, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Metoda pro výpočet plochy pod křivkou');
INSERT INTO QOption (content) VALUES ('Operace pro zjištění průměrné hodnoty funkce');
INSERT INTO QOption (content) VALUES ('Proces určování maximálních a minimálních hodnot funkce');
INSERT INTO QOption (content) VALUES ('Metoda pro řešení lineárních rovnic');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Matematika', 'Co je integrál?', 221, 222, 223, 224, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Místo ve vesmíru s extrémně vysokou gravitací');
INSERT INTO QOption (content) VALUES ('Místo ve vesmíru s nízkou gravitací');
INSERT INTO QOption (content) VALUES ('Typ hvězdy s nízkou teplotou');
INSERT INTO QOption (content) VALUES ('Oblast ve vesmíru bez hvězd');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Fyzika', 'Co je černá díra?', 225, 226, 227, 228, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Měření kyselosti nebo zásaditosti roztoku');
INSERT INTO QOption (content) VALUES ('Měření hustoty');
INSERT INTO QOption (content) VALUES ('Měření teploty');
INSERT INTO QOption (content) VALUES ('Měření elektrického náboje');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Chemie', 'Co je pH?', 229, 230, 231, 232, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Proces, při kterém dochází ke změnám v genetické struktuře populace');
INSERT INTO QOption (content) VALUES ('Proces, při kterém organismy získávají nové vlastnosti pro lepší přežití');
INSERT INTO QOption (content) VALUES ('Proces, při kterém organismy zvyšují svou životní úroveň');
INSERT INTO QOption (content) VALUES ('Proces, při kterém dochází k rychlé adaptaci organismů na změny klimatu');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Biologie', 'Co je evoluce?', 233, 234, 235, 236, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Sada pravidel nebo instrukcí pro řešení problému');
INSERT INTO QOption (content) VALUES ('Metoda pro rychlé vyhledávání informací v databázi');
INSERT INTO QOption (content) VALUES ('Postup pro automatizaci opakujících se úloh');
INSERT INTO QOption (content) VALUES ('Typ datového formátu');
INSERT INTO Question (questionType, description, option1, option2, option3, option4, type, variant) VALUES ('Informatika', 'Co je algoritmus?', 237, 238, 239, 240, 'alltext', 'A');

INSERT INTO QOption (content) VALUES ('Zlepšení');
INSERT INTO QOption (content) VALUES ('Medaile');
INSERT INTO QOption (content) VALUES ('Závod');
INSERT INTO QOption (content) VALUES ('Únava');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Příčina a následek', 'Studium - Vzdělání', 'Trénink', 241, 242, 243, 244, 'anatext', 'B');

INSERT INTO QOption (content) VALUES ('Míchání');
INSERT INTO QOption (content) VALUES ('Vaření');
INSERT INTO QOption (content) VALUES ('Krájení');
INSERT INTO QOption (content) VALUES ('Pečení');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Nástroj a jeho funkce', 'Štětec - Malování', 'Lžíce', 245, 246, 247, 248, 'anatext', 'B');

INSERT INTO QOption (content) VALUES ('Okno');
INSERT INTO QOption (content) VALUES ('Branka');
INSERT INTO QOption (content) VALUES ('Zahrada');
INSERT INTO QOption (content) VALUES ('Nábytek');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Vztah celek a jeho část', 'Auto - Motor', 'Dům', 249, 250, 251, 252, 'anatext', 'B');

INSERT INTO QOption (content) VALUES ('Hluk');
INSERT INTO QOption (content) VALUES ('Hudba');
INSERT INTO QOption (content) VALUES ('Píseň');
INSERT INTO QOption (content) VALUES ('Melodie');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Protikladnost', 'Světlo - Tma', 'Ticho', 253, 254, 255, 256, 'anatext', 'B');

INSERT INTO QOption (content) VALUES ('Moudrý');
INSERT INTO QOption (content) VALUES ('Veselý');
INSERT INTO QOption (content) VALUES ('Smutný');
INSERT INTO QOption (content) VALUES ('Zvědavý');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Souznačnost', 'Rychlý - Spěšný', 'Inteligentní', 257, 258, 259, 260, 'anatext', 'B');

INSERT INTO QOption (content) VALUES ('Květina');
INSERT INTO QOption (content) VALUES ('Strom');
INSERT INTO QOption (content) VALUES ('Zahrada');
INSERT INTO QOption (content) VALUES ('List');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Nadřazenost a podřazenost', 'Pták - Živočich', 'Růže', 261, 262, 263, 264, 'anatext', 'B');

INSERT INTO QOption (content) VALUES ('Léto');
INSERT INTO QOption (content) VALUES ('Zima');
INSERT INTO QOption (content) VALUES ('Listopad');
INSERT INTO QOption (content) VALUES ('Duben');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Souřadnost', 'Pondělí - Úterý', 'Jaro', 265, 266, 267, 268, 'anatext', 'B');

INSERT INTO QOption (content) VALUES ('Dům');
INSERT INTO QOption (content) VALUES ('Nářadí');
INSERT INTO QOption (content) VALUES ('Kresba');
INSERT INTO QOption (content) VALUES ('Cihla');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Vztah použití či vytvoření', 'Kuchař - Jídlo', 'Stavitel', 269, 270, 271, 272, 'anatext', 'B');

INSERT INTO QOption (content) VALUES ('Sáč');
INSERT INTO QOption (content) VALUES ('Sac');
INSERT INTO QOption (content) VALUES ('Sác');
INSERT INTO QOption (content) VALUES ('Asč');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Podobnost na úrovni zápisu', 'Mír - Rim', 'Čas', 273, 274, 275, 276, 'anatext', 'B');

INSERT INTO QOption (content) VALUES ('Světlo');
INSERT INTO QOption (content) VALUES ('Teplo');
INSERT INTO QOption (content) VALUES ('Měsíc');
INSERT INTO QOption (content) VALUES ('Den');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Příčina a následek', 'Vítr - Vlny', 'Slunce', 277, 278, 279, 280, 'anatext', 'B');

INSERT INTO QOption (content) VALUES ('Vrtání');
INSERT INTO QOption (content) VALUES ('Sekání');
INSERT INTO QOption (content) VALUES ('Připevnění');
INSERT INTO QOption (content) VALUES ('Měření');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Nástroj a jeho funkce', 'Klíč - Odemykání', 'Hřebík', 281, 282, 283, 284, 'anatext', 'A');

INSERT INTO QOption (content) VALUES ('Stránka');
INSERT INTO QOption (content) VALUES ('Obálka');
INSERT INTO QOption (content) VALUES ('Písmo');
INSERT INTO QOption (content) VALUES ('Kapitola');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Vztah celek a jeho část', 'Strom - Kmen', 'Kniha', 285, 286, 287, 288, 'anatext', 'A');

INSERT INTO QOption (content) VALUES ('Sucho');
INSERT INTO QOption (content) VALUES ('Vlhko');
INSERT INTO QOption (content) VALUES ('Chladno');
INSERT INTO QOption (content) VALUES ('Teplo');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Protikladnost', 'Horko - Zima', 'Mokro', 289, 290, 291, 292, 'anatext', 'A');

INSERT INTO QOption (content) VALUES ('Zarmoucený');
INSERT INTO QOption (content) VALUES ('Rozzlobený');
INSERT INTO QOption (content) VALUES ('Zklamaný');
INSERT INTO QOption (content) VALUES ('Unavený');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Souznačnost', 'Veselý - Radostný', 'Smutný', 293, 294, 295, 296, 'anatext', 'A');

INSERT INTO QOption (content) VALUES ('Čtyřúhelník');
INSERT INTO QOption (content) VALUES ('Geometrický tvar');
INSERT INTO QOption (content) VALUES ('Trojúhelník');
INSERT INTO QOption (content) VALUES ('Kruh');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Nadřazenost a podřazenost', 'Prvočíslo - Číslo', 'Rovnoběžník', 297, 298, 299, 300, 'anatext', 'A');

INSERT INTO QOption (content) VALUES ('Západ');
INSERT INTO QOption (content) VALUES ('Horní');
INSERT INTO QOption (content) VALUES ('Dolní');
INSERT INTO QOption (content) VALUES ('Střed');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Souřadnost', 'Sever - Jih', 'Východ', 301, 302, 303, 304, 'anatext', 'A');

INSERT INTO QOption (content) VALUES ('Obraz');
INSERT INTO QOption (content) VALUES ('Plátno');
INSERT INTO QOption (content) VALUES ('Barva');
INSERT INTO QOption (content) VALUES ('Štětec');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Vztah použití či vytvoření', 'Spisovatel - Kniha', 'Malíř', 305, 306, 307, 308, 'anatext', 'A');

INSERT INTO QOption (content) VALUES ('Láger');
INSERT INTO QOption (content) VALUES ('Lager');
INSERT INTO QOption (content) VALUES ('Relag');
INSERT INTO QOption (content) VALUES ('Elgár');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Podobnost na úrovni zápisu', 'Radar - Radar', 'Regál', 309, 310, 311, 312, 'anatext', 'A');

INSERT INTO QOption (content) VALUES ('Pára');
INSERT INTO QOption (content) VALUES ('Oblak');
INSERT INTO QOption (content) VALUES ('Vítr');
INSERT INTO QOption (content) VALUES ('Déšť');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Příčina a následek', 'Studený vzduch - Mráz', 'Horký vzduch', 313, 314, 315, 316, 'anatext', 'A');

INSERT INTO QOption (content) VALUES ('Vrtání');
INSERT INTO QOption (content) VALUES ('Sekání');
INSERT INTO QOption (content) VALUES ('Míchání');
INSERT INTO QOption (content) VALUES ('Malování');
INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('Nástroj a jeho funkce', 'Pila - Řezání', 'Vrtačka', 317, 318, 319, 320, 'anatext', 'A');

INSERT INTO QOption (content) VALUES ('tf1_1_T1_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_1_T2_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_1_T3_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_1_T4_ss3_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_1_M_ss3_md', 'tf1_1_M_ss3.jpeg', 321, 322, 323, 324, 'image');

INSERT INTO QOption (content) VALUES ('tf1_2_T1_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_2_T2_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_2_T3_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_2_T4_ss1_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_2_M_ss1_md', 'tf1_2_M_ss1.jpeg', 325, 326, 327, 328, 'image');

INSERT INTO QOption (content) VALUES ('tf1_3_T1_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_3_T2_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_3_T3_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_3_T4_ss2_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_3_M_ss2_md', 'tf1_3_M_ss2.jpeg', 329, 330, 331, 332, 'image');

INSERT INTO QOption (content) VALUES ('tf1_4_T1_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_4_T2_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_4_T3_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_4_T4_ss3_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_4_M_ss3_md', 'tf1_4_M_ss3.jpeg', 333, 334, 335, 336, 'image');

INSERT INTO QOption (content) VALUES ('tf1_5_T1_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_5_T2_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_5_T3_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_5_T4_ss1_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_5_M_ss1_md', 'tf1_5_M_ss1.jpeg', 337, 338, 339, 340, 'image');

INSERT INTO QOption (content) VALUES ('tf1_6_T1_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_6_T2_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_6_T3_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_6_T4_ss2_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_6_M_ss2_md', 'tf1_6_M_ss2.jpeg', 341, 342, 343, 344, 'image');

INSERT INTO QOption (content) VALUES ('tf1_7_T1_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_7_T2_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_7_T3_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_7_T4_ss3_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_7_M_ss3_md', 'tf1_7_M_ss3.jpeg', 345, 346, 347, 348, 'image');

INSERT INTO QOption (content) VALUES ('tf1_8_T1_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_8_T2_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_8_T3_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_8_T4_ss1_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_8_M_ss1_md', 'tf1_8_M_ss1.jpeg', 349, 350, 351, 352, 'image');

INSERT INTO QOption (content) VALUES ('tf1_9_T1_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_9_T2_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_9_T3_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_9_T4_ss2_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_9_M_ss2_md', 'tf1_9_M_ss2.jpeg', 353, 354, 355, 356, 'image');

INSERT INTO QOption (content) VALUES ('tf1_10_T1_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_10_T2_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_10_T3_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_10_T4_ss3_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_10_M_ss3_md', 'tf1_10_M_ss3.jpeg', 357, 358, 359, 360, 'image');

INSERT INTO QOption (content) VALUES ('tf1_11_T1_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_11_T2_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_11_T3_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_11_T4_ss1_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_11_M_ss1_md', 'tf1_11_M_ss1.jpeg', 361, 362, 363, 364, 'image');

INSERT INTO QOption (content) VALUES ('tf1_12_T1_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_12_T2_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_12_T3_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_12_T4_ss2_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_12_M_ss2_md', 'tf1_12_M_ss2.jpeg', 365, 366, 367, 368, 'image');

INSERT INTO QOption (content) VALUES ('tf1_13_T1_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_13_T2_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_13_T3_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_13_T4_ss3_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_13_M_ss3_md', 'tf1_13_M_ss3.jpeg', 369, 370, 371, 372, 'image');

INSERT INTO QOption (content) VALUES ('tf1_14_T1_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_14_T2_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_14_T3_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_14_T4_ss1_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_14_M_ss1_md', 'tf1_14_M_ss1.jpeg', 373, 374, 375, 376, 'image');

INSERT INTO QOption (content) VALUES ('tf1_15_T1_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_15_T2_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_15_T3_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_15_T4_ss2_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_15_M_ss2_md', 'tf1_15_M_ss2.jpeg', 377, 378, 379, 380, 'image');

INSERT INTO QOption (content) VALUES ('tf1_16_T1_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_16_T2_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_16_T3_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_16_T4_ss3_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_16_M_ss3_md', 'tf1_16_M_ss3.jpeg', 381, 382, 383, 384, 'image');

INSERT INTO QOption (content) VALUES ('tf1_17_T1_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_17_T2_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_17_T3_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_17_T4_ss1_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_17_M_ss1_md', 'tf1_17_M_ss1.jpeg', 385, 386, 387, 388, 'image');

INSERT INTO QOption (content) VALUES ('tf1_18_T1_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_18_T2_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_18_T3_ss2_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_18_T4_ss2_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_18_M_ss2_md', 'tf1_18_M_ss2.jpeg', 389, 390, 391, 392, 'image');

INSERT INTO QOption (content) VALUES ('tf1_19_T1_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_19_T2_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_19_T3_ss3_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_19_T4_ss3_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_19_M_ss3_md', 'tf1_19_M_ss3.jpeg', 393, 394, 395, 396, 'image');

INSERT INTO QOption (content) VALUES ('tf1_20_T1_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_20_T2_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_20_T3_ss1_md.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_20_T4_ss1_md.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_20_M_ss1_md', 'tf1_20_M_ss1.jpeg', 397, 398, 399, 400, 'image');

INSERT INTO QOption (content) VALUES ('tf1_21_T1_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_21_T2_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_21_T3_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_21_T4_ss2_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_21_M_ss2_pd', 'tf1_21_M_ss2.jpeg', 401, 402, 403, 404, 'image');

INSERT INTO QOption (content) VALUES ('tf1_22_T1_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_22_T2_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_22_T3_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_22_T4_ss3_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_22_M_ss3_pd', 'tf1_22_M_ss3.jpeg', 405, 406, 407, 408, 'image');

INSERT INTO QOption (content) VALUES ('tf1_23_T1_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_23_T2_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_23_T3_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_23_T4_ss1_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_23_M_ss1_pd', 'tf1_23_M_ss1.jpeg', 409, 410, 411, 412, 'image');

INSERT INTO QOption (content) VALUES ('tf1_24_T1_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_24_T2_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_24_T3_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_24_T4_ss2_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_24_M_ss2_pd', 'tf1_24_M_ss2.jpeg', 413, 414, 415, 416, 'image');

INSERT INTO QOption (content) VALUES ('tf1_25_T1_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_25_T2_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_25_T3_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_25_T4_ss3_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_25_M_ss3_pd', 'tf1_25_M_ss3.jpeg', 417, 418, 419, 420, 'image');

INSERT INTO QOption (content) VALUES ('tf1_26_T1_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_26_T2_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_26_T3_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_26_T4_ss1_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_26_M_ss1_pd', 'tf1_26_M_ss1.jpeg', 421, 422, 423, 424, 'image');

INSERT INTO QOption (content) VALUES ('tf1_27_T1_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_27_T2_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_27_T3_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_27_T4_ss2_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_27_M_ss2_pd', 'tf1_27_M_ss2.jpeg', 425, 426, 427, 428, 'image');

INSERT INTO QOption (content) VALUES ('tf1_28_T1_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_28_T2_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_28_T3_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_28_T4_ss3_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_28_M_ss3_pd', 'tf1_28_M_ss3.jpeg', 429, 430, 431, 432, 'image');

INSERT INTO QOption (content) VALUES ('tf1_29_T1_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_29_T2_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_29_T3_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_29_T4_ss1_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_29_M_ss1_pd', 'tf1_29_M_ss1.jpeg', 433, 434, 435, 436, 'image');

INSERT INTO QOption (content) VALUES ('tf1_30_T1_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_30_T2_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_30_T3_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_30_T4_ss2_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_30_M_ss2_pd', 'tf1_30_M_ss2.jpeg', 437, 438, 439, 440, 'image');

INSERT INTO QOption (content) VALUES ('tf1_31_T1_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_31_T2_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_31_T3_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_31_T4_ss3_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_31_M_ss3_pd', 'tf1_31_M_ss3.jpeg', 441, 442, 443, 444, 'image');

INSERT INTO QOption (content) VALUES ('tf1_32_T1_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_32_T2_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_32_T3_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_32_T4_ss1_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_32_M_ss1_pd', 'tf1_32_M_ss1.jpeg', 445, 446, 447, 448, 'image');

INSERT INTO QOption (content) VALUES ('tf1_33_T1_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_33_T2_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_33_T3_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_33_T4_ss2_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_33_M_ss2_pd', 'tf1_33_M_ss2.jpeg', 449, 450, 451, 452, 'image');

INSERT INTO QOption (content) VALUES ('tf1_34_T1_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_34_T2_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_34_T3_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_34_T4_ss3_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_34_M_ss3_pd', 'tf1_34_M_ss3.jpeg', 453, 454, 455, 456, 'image');

INSERT INTO QOption (content) VALUES ('tf1_35_T1_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_35_T2_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_35_T3_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_35_T4_ss1_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_35_M_ss1_pd', 'tf1_35_M_ss1.jpeg', 457, 458, 459, 460, 'image');

INSERT INTO QOption (content) VALUES ('tf1_36_T1_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_36_T2_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_36_T3_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_36_T4_ss2_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_36_M_ss2_pd', 'tf1_36_M_ss2.jpeg', 461, 462, 463, 464, 'image');

INSERT INTO QOption (content) VALUES ('tf1_37_T1_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_37_T2_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_37_T3_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_37_T4_ss3_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_37_M_ss3_pd', 'tf1_37_M_ss3.jpeg', 465, 466, 467, 468, 'image');

INSERT INTO QOption (content) VALUES ('tf1_38_T1_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_38_T2_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_38_T3_ss1_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_38_T4_ss1_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_38_M_ss1_pd', 'tf1_38_M_ss1.jpeg', 469, 470, 471, 472, 'image');

INSERT INTO QOption (content) VALUES ('tf1_39_T1_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_39_T2_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_39_T3_ss2_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_39_T4_ss2_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('A', 'tf1_39_M_ss2_pd', 'tf1_39_M_ss2.jpeg', 473, 474, 475, 476, 'image');

INSERT INTO QOption (content) VALUES ('tf1_40_T1_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_40_T2_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_40_T3_ss3_pd.jpeg');
INSERT INTO QOption (content) VALUES ('tf1_40_T4_ss3_pd.jpeg');
INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('B', 'tf1_40_M_ss3_pd', 'tf1_40_M_ss3.jpeg', 477, 478, 479, 480, 'image');

