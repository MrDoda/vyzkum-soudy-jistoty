INSERT INTO UserGroup (groupName, active) VALUES ('Group 1', FALSE);
INSERT INTO UserGroup (groupName, active) VALUES ('Group 2', FALSE);

-- Users for Group 1
INSERT INTO User (userKey, email, gender, icon, groupId) VALUES ('user1', 'user1@example.com', 0, NULL, 1);
INSERT INTO User (userKey, email, gender, icon, groupId) VALUES ('user2', 'user2@example.com', 1, NULL, 1);
INSERT INTO User (userKey, email, gender, icon, groupId) VALUES ('user3', 'user3@example.com', 0, NULL, 1);
INSERT INTO User (userKey, email, gender, icon, groupId) VALUES ('user4', 'user4@example.com', 1, NULL, 1);

-- Users for Group 2
INSERT INTO User (userKey, email, gender, icon, groupId) VALUES ('user5', 'user5@example.com', 0, NULL, 2);
INSERT INTO User (userKey, email, gender, icon, groupId) VALUES ('user6', 'user6@example.com', 1, NULL, 2);
INSERT INTO User (userKey, email, gender, icon, groupId) VALUES ('user7', 'user7@example.com', 0, NULL, 2);
INSERT INTO User (userKey, email, gender, icon, groupId) VALUES ('user8', 'user8@example.com', 1, NULL, 2);
