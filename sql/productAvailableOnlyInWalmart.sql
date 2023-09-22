-- Select products only retailed in Walmart but not in Target

SELECT productName
FROM Products
WHERE productId IN (
        SELECT productId
        FROM Markets NATURAL JOIN Retails NATURAL JOIN Products
        WHERE marketName = "Walmart")

UNION

SELECT productName
FROM Products
WHERE productId NOT IN (
        SELECT productId
        FROM Markets NATURAL JOIN Retails NATURAL JOIN Products
        WHERE marketName = "Target")

ORDER BY productName;


# SELECT productName, location
# FROM Products
# WHERE productId IN (
#         SELECT productId
#         FROM Markets NATURAL JOIN Retails NATURAL JOIN Products NATURAL JOIN ProductStatus
#         WHERE isInStock = true AND numOfLikes > numOfDislikes AND marketName = "Walmart")
#
# UNION
#
# SELECT productName, location
# FROM Products
# WHERE productId NOT IN (
#         SELECT productId
#         FROM Markets NATURAL JOIN Retails NATURAL JOIN Products NATURAL JOIN ProductStatus
#         WHERE isInStock = true AND numOfLikes > numOfDislikes AND marketName = "Target")
#
# ORDER BY productName;