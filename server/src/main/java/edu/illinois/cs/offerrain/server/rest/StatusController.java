package edu.illinois.cs.offerrain.server.rest;

import edu.illinois.cs.offerrain.server.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin
public class StatusController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * 1. GET method which receives a String for marketName. Similar to search
     * 2. Return a JSON class called Status
     *
     * @param marketName
     * @return
     */

    private static final String dict = "abcdefghijklmnopqrstuxyz1234567890";
    @GetMapping("/status")
    public @ResponseBody List<Status> status(@RequestParam Map<String, String> input) {

        String productName = input.get("productName");
        String marketName = input.get("marketName");
        String sql = """
                SELECT statusId, productName, marketName, numOfLikes, numOfDislikes, timestamp, isInStock 
                FROM ProductStatus NATURAL JOIN Retails NATURAL JOIN Products NATURAL JOIN Markets 
                WHERE productName LIKE ? AND marketName = ?
                ORDER BY timestamp DESC
                LIMIT 50;
                """;

        return jdbcTemplate.query(
                sql, new Object[]{"%" + productName + "%", marketName},
                (rs, rowNum) -> new Status( rs.getString("statusId"),
                                            trim(rs.getString("productName")),
                                            rs.getString("marketName"),
                                            rs.getInt("numOfLikes"),
                                            rs.getInt("numOfDislikes"),
                                            rs.getDate("timeStamp"),
                                            rs.getBoolean("isInStock"))
        );
    }

    /**
     * 1. POST method that receives a JSON file which contains 3 params: productnm, mktnm, and isInStock
     * 2. Need to obtain elements needed for creating new ProductStatus tuple first
     * 3. Return HTTP status code
     *
     * @param newstatus
     * @return
     */
    @PostMapping("/postStatus")
    public @ResponseBody Status addStatus(@RequestBody Map<String, Object> newstatus) {

        // Get the retailId
        String productName = newstatus.get("productnm").toString();
        String marketName = newstatus.get("mktnm").toString();
        String readSql = """
        SELECT retailId 
        FROM Markets NATURAL JOIN Products NATURAL JOIN Retails
        WHERE marketName = ? AND productName LIKE ?;
        """;
        List<String> idList = jdbcTemplate.query(
                readSql, new Object[]{marketName, "%" + productName + "%"},
                (rs, rowNum) -> rs.getString("retailId")
        );

        if (idList.size() == 0) {
            System.out.println("retailId not found");
        }
        String id = idList.get(0);

        // Insert the new ProductStatus
        String statusId = generateId(32);

        String sql = "INSERT INTO ProductStatus VALUES(?, ?, 'jkcqh53tqstiyfnm2l89s0mcus99km49', CURRENT_TIMESTAMP(), ?, 0, 0)"; // Hard coded userId since no login yet
        try {
            jdbcTemplate.update(
                    sql,
                    new Object[]{statusId, id, newstatus.get("isInStock")},
                    new int[]{Types.VARCHAR, Types.VARCHAR, Types.BOOLEAN}
            );
        } catch(Exception e) {
            System.out.println(e);
            Date date = new Date();
            Status res = new Status(statusId, productName, marketName, 0, 0, date, Boolean.valueOf(newstatus.get("isInStock").toString()));
            return res;
        }
        Date date = new Date();
        Status res = new Status(statusId, productName, marketName, 0, 0, date, Boolean.valueOf(newstatus.get("isInStock").toString()));
        return res;
    }

    /**
     * Trim the \" " of the product name
     * @param input
     * @return
     */
    private static String trim(String input) {
        return input.replace('"', ' ').trim();
    }

    /**
     * Generate random 32 bit statusId
     * @param length
     * @return
     */
    private static String generateId(int length) {
        // Generate statusId which consists of lowercase letters and digits
        int rightLimit = dict.length();
        int targetStringLength = length;
        Random random = new Random();
        StringBuilder buffer = new StringBuilder(targetStringLength);

        for (int i = 0; i < targetStringLength; i++) {
            int randomLimitedInt = random.nextInt(rightLimit);
            buffer.append(dict.charAt(randomLimitedInt));
        }

        String generatedString = buffer.toString();
        System.out.println(generatedString);
        return generatedString;
    }
}
