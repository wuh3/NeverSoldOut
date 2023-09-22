package edu.illinois.cs.offerrain.server.rest;

import edu.illinois.cs.offerrain.server.entity.Complex1;
import edu.illinois.cs.offerrain.server.entity.Complex2;
import edu.illinois.cs.offerrain.server.entity.Complex1ReceiveBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ComplexContorller {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @GetMapping("/complex1")
    public @ResponseBody List<Complex1> complex1(@RequestParam(value = "query", defaultValue = "Milk") String productName) {
//        String productName = productName_m.productName;
        System.out.println(productName);
        String sql = """
                SELECT m.marketName, p.productName, location, price
                FROM Markets m NATURAL JOIN Retails NATURAL JOIN Products p NATURAL JOIN ProductStatus NATURAL JOIN (
                    SELECT AVG(price) as avg_price, categoryId
                    FROM Retails NATURAL JOIN Products
                    GROUP BY categoryId) as table2
                WHERE p.productName LIKE ? AND isInStock = true AND numOfLikes > numOfDislikes AND price <= avg_price
                ORDER BY price DESC
                LIMIT 50;
                """;


        return jdbcTemplate.query(sql, new Object[]{"%" + productName + "%"},
                (rs, rowNum) -> new Complex1(
                        rs.getString("marketName"),
                        rs.getString("productName"),
                        rs.getString("location"),
                        rs.getDouble("price")
                )
        );
    }

    @GetMapping("/complex2")
    public @ResponseBody List<Complex2> complex2() {
        String sql = """
                ((SELECT marketName, numOfLikes, COUNT(postUserId) as numOfUsers
                FROM ProductStatus NATURAL JOIN Retails NATURAL JOIN Markets
                WHERE marketName = "Costco" and timestamp > '1995-05-05 23:59:59'
                GROUP BY numOfLikes
                HAVING numOfUsers > 10
                ORDER BY numOfLikes)
                UNION
                (SELECT marketName, numOfLikes, COUNT(postUserId) as numOfUsers
                FROM ProductStatus NATURAL JOIN Retails NATURAL JOIN Markets
                WHERE marketName = "Walmart" and timestamp > '1995-05-05 23:59:59'
                GROUP BY numOfLikes
                HAVING numOfUsers > 50
                ORDER BY numOfLikes))
                LIMIT 50;
                """;


        return jdbcTemplate.query(sql,
                (rs, rowNum) -> new Complex2(
                        rs.getString("marketName"),
                        rs.getInt("numOfLikes"),
                        rs.getInt("numOfUsers")
                )
        );
    }

    @GetMapping("/complex3")
    public @ResponseBody List<String> complex3() {
        String sql = """
                (SELECT productName
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
                         WHERE marketName = "Target"))
                LIMIT 50;
                """;


        return jdbcTemplate.query(sql,
                (rs, rowNum) ->
                        rs.getString("productName")
                );
    }
}
