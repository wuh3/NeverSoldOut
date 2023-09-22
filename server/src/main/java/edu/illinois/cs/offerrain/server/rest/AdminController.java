package edu.illinois.cs.offerrain.server.rest;

import edu.illinois.cs.offerrain.server.entity.Retails;
import edu.illinois.cs.offerrain.server.entity.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.sql.Types;
import java.util.*;

@RestController
@CrossOrigin
public class AdminController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * 1. GET method which return 50 retails to Admin
     * 2. Return a JSON class called Retails
     *
     * @param
     * @return
     */

    @GetMapping("/admin/retails")
    public @ResponseBody List<Retails> getRetail() {
        String sql = """
                SELECT retailId, marketId, marketName, productId, productName, price 
                FROM Retails NATURAL JOIN Products NATURAL JOIN Markets
                ORDER BY retailId
                LIMIT 50;
                """;
        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> new Retails(
                rs.getString("retailId"),
                rs.getString("marketId"),
                rs.getString("marketName"),
                rs.getString("productId"),
                trim(rs.getString("productName")),
                rs.getDouble("price"))
        );
    }

    /**
     * 1. POST method that receives a JSON file which contains retailId and price
     * 2. Only updates price
     * 3. Return HTTP status code
     *
     * @param newprice
     * @return
     */
    @PutMapping("/admin/updatePrice")
    public @ResponseBody Map<String, Integer> updatePrice(@RequestBody Map<String, String> newprice) {
        Map<String, Integer> output = new HashMap<>();
        String retailId = newprice.get("retailId");
        String newPrice = newprice.get("price");
        String sql = """
        UPDATE Retails 
        SET price = ?
        WHERE retailId = ?;
        """;
        try {
            jdbcTemplate.update(
                    sql,
                    new Object[]{newPrice, retailId},
                    new int[]{Types.DOUBLE, Types.VARCHAR}
            );
        } catch(Exception e) {
            System.out.println(e);
            output.put("status", 400);
            return output;
        }
        output.put("status", 200);
        return output;
    }

    /**
     * 1. DELETE method that receives a JSON file which contains statusId
     * 2. Delete corresponding status
     * 3. Return HTTP status code
     *
     * @param statusId
     * @return
     */
    @DeleteMapping("/admin/deleteStatus")
    public @ResponseBody Map<String, Integer> deleteStatus(@RequestParam(value = "statusId") String statusId) {
        Map<String, Integer> output = new HashMap<>();
        String sql = """
        DELETE
        FROM ProductStatus
        WHERE statusId = ?;
        """;
        try {
            jdbcTemplate.update(
                    sql,
                    statusId);
        } catch(Exception e) {
            System.out.println(e);
            output.put("status", 400);
            return output;
        }
        output.put("status", 200);
        return output;
    }
    private static String trim(String input) {
        return input.replace('"', ' ').trim();
    }
}
