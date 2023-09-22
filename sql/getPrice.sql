-- Query that seeks the market where steaks with price below average are retailed
SELECT m.marketName, p.productName, location, price
FROM Markets m NATURAL JOIN Retails NATURAL JOIN Products p  NATURAL JOIN (
    SELECT AVG(price) as avg_price, categoryId
    FROM Retails NATURAL JOIN Products
    GROUP BY categoryId) as table2
WHERE p.productName LIKE "%Milk%" AND price <= avg_price
ORDER BY price DESC;


# SELECT m.marketName, p.productName, location, price
# FROM Markets m NATURAL JOIN Retails NATURAL JOIN Products p NATURAL JOIN ProductStatus NATURAL JOIN (
#     SELECT AVG(price) as avg_price, categoryId
#     FROM Retails NATURAL JOIN Products
#     GROUP BY categoryId) as table2
# WHERE p.productName LIKE "%Milk%" AND isInStock = true AND numOfLikes > numOfDislikes AND price <= avg_price
# ORDER BY price DESC;