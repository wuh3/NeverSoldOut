package edu.illinois.cs.offerrain.server.rest;

import edu.illinois.cs.offerrain.server.entity.SearchResult;
import edu.illinois.cs.offerrain.server.entity.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class SearchController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * 1. Search product by keywords
     *
     * @param key
     * @return
     */
    @GetMapping("/query")
    public @ResponseBody List<SearchResult> searchProduct(@RequestParam(value = "query") String key) {
        String sql = """
                SELECT marketName, productName, price, location, isInStock, timestamp 
                FROM ProductStatus NATURAL JOIN Retails NATURAL JOIN Products NATURAL JOIN Markets 
                WHERE productName LIKE ? ORDER BY timestamp DESC LIMIT 50;
                """;
        return jdbcTemplate.query(
                sql, new Object[]{"%" + key + "%"},
                (rs, rowNum) -> new SearchResult( trim(rs.getString("productName")),
                                            rs.getString("marketName"),
                                            rs.getString("location"),
                                            rs.getDouble("price"),
                                            rs.getBoolean("isInStock"),
                                            rs.getDate("timestamp")
                                            )
        );
    }

    private static String trim(String input) {
        return input.replace('"', ' ').trim();
    }
}
