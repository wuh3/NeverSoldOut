package edu.illinois.cs.offerrain.server.rest;

import edu.illinois.cs.offerrain.server.entity.Markets;
import edu.illinois.cs.offerrain.server.entity.Pair;
import edu.illinois.cs.offerrain.server.entity.Products;
import edu.illinois.cs.offerrain.server.entity.Retails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class DataController {

    @Autowired
    JdbcTemplate jdbcTemplate;


    @GetMapping("/markets")
    public @ResponseBody List<Markets> markets() {
        return jdbcTemplate.query(
                "SELECT * FROM Markets",
                (rs, rowNum) -> new Markets(rs.getString("marketId"), rs.getString("marketName"), rs.getString("location"))
        );
    }

    @GetMapping("/categories")
    public @ResponseBody Map<String, List<String>> categories() {

        List<Pair> levels = jdbcTemplate.query(
                "SELECT * FROM Categories",
                (rs, rowNum) -> new Pair(rs.getString("level1"), rs.getString("level2"))
        );
        Map<String, List<String>> output = new HashMap<>();
        for (Pair p : levels) {
            List<String> list = output.getOrDefault(p.key, new ArrayList<String>());
            list.add(p.value);
            output.put(p.key, list);
        }
        return output;
    }

    @GetMapping ("/retails/marketId")
    public @ResponseBody List<Retails> getRetails(@RequestParam String marketId) {

        return jdbcTemplate.query(
                """
                SELECT retailId, marketId, marketName, productId, productName, price 
                FROM Retails NATURAL JOIN Products NATURAL JOIN Markets 
                WHERE marketId = ? 
                LIMIT 50
                """, new Object[]{marketId},
                (rs, rowNum) -> new Retails(
                        rs.getString("retailId"),
                        rs.getString("marketId"),
                        rs.getString("marketName"),
                        rs.getString("productId"),
                        trim(rs.getString("productName")),
                        rs.getDouble("price")
                )
        );
    }

    @GetMapping ("/retails/productId")
    public @ResponseBody List<Retails> retails(@RequestParam String productId) {

        return jdbcTemplate.query(
                """
                SELECT retailId, marketId, marketName, productId, productName, price 
                FROM Retails NATURAL JOIN Products NATURAL JOIN Markets 
                WHERE productId = ? 
                LIMIT 50
                """, new Object[]{productId},
                (rs, rowNum) -> new Retails(
                        rs.getString("retailId"),
                        rs.getString("marketId"),
                        rs.getString("marketName"),
                        rs.getString("productId"),
                        trim(rs.getString("productName")),
                        rs.getDouble("price")
                )
        );
    }

    @GetMapping("/products")
    public @ResponseBody List<Products> products() {

        return jdbcTemplate.query(
                """
                SELECT productId, categoryId, ProductName 
                FROM Products 
                LIMIT 50
                """,
                (rs, rowNum) -> new Products(
                        rs.getString("productId"),
                        rs.getString("categoryId"),
                        trim(rs.getString("productName"))
                )
        );
    }
    private static String trim(String input) {
        return input.replace('"', ' ').trim();
    }

}
