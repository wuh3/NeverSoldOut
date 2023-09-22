--  <-- Table Generation -->

DROP TABLE IF EXISTS Likes;
DROP TABLE IF EXISTS ProductStatus;
DROP TABLE IF EXISTS Retails;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Markets;
DROP TABLE IF EXISTS Categories;

CREATE TABLE Categories
(
    categoryId CHAR(32) PRIMARY KEY,
    level1     VARCHAR(32),
    level2     VARCHAR(32)
);

CREATE TABLE Markets
(
    marketId   CHAR(32) PRIMARY KEY,
    marketName VARCHAR(32),
    location   VARCHAR(64)
);

CREATE TABLE Users
(
    userId   CHAR(32) PRIMARY KEY,
    userName VARCHAR(32),
    email    VARCHAR(32),
    password CHAR(32)
);


CREATE TABLE Products
(
    productId   CHAR(32) PRIMARY KEY,
    categoryId  CHAR(32),
    productName VARCHAR(64),
    FOREIGN KEY (categoryId) REFERENCES Categories (categoryId)
);

CREATE TABLE Retails
(
    retailId  CHAR(32) PRIMARY KEY,
    marketId  CHAR(32),
    productId CHAR(32),
    price     REAL,
    FOREIGN KEY (marketId) REFERENCES Markets (marketId),
    FOREIGN KEY (productId) REFERENCES Products (productId)
);

CREATE TABLE ProductStatus
(
    statusId      CHAR(32) PRIMARY KEY,
    retailId      CHAR(32),
    postUserId    CHAR(32),
    timestamp     DATETIME,
    isInStock     BOOLEAN,
    numOfLikes    INT,
    numOfDislikes INT,
    FOREIGN KEY (retailId) REFERENCES Retails (retailId),
    FOREIGN KEY (postUserId) REFERENCES Users (userId)
);


CREATE TABLE Likes
(
    statusId  CHAR(32),
    userId    CHAR(32),
    sentiment BOOLEAN,
    FOREIGN KEY (statusId) REFERENCES ProductStatus (statusId),
    FOREIGN KEY (userId) REFERENCES Users (userId),
    PRIMARY KEY (statusId, userId)
);