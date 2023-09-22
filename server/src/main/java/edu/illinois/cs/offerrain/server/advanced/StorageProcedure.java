package edu.illinois.cs.offerrain.server.advanced;

import edu.illinois.cs.offerrain.server.entity.ProcedureReturn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@CrossOrigin
public class StorageProcedure {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public void createStorageProcedure() {
        String sql = """
                CREATE PROCEDURE GetDiscount()
                BEGIN
                    DECLARE exit_loop1 BOOLEAN DEFAULT FALSE;
                    DECLARE varProductName VARCHAR(64);
                    DECLARE varMarketName VARCHAR(64);
                    DECLARE varOldPrice REAL;
                    DECLARE varNewPrice REAL;
                    DECLARE cusCur1 CURSOR FOR (SELECT *
                                                FROM (SELECT productName, marketName, price
                                  FROM Retails
                                           NATURAL JOIN Products
                                           NATURAL JOIN Markets
                                  WHERE marketName = 'Walmart'
                                    AND productName LIKE '%Milk%'
                                  UNION
                                  SELECT productName, marketName, price
                                  FROM Retails
                                           NATURAL JOIN Products
                                           NATURAL JOIN Markets
                                  WHERE marketName = 'Costco'
                                    AND productName LIKE '%Beef%') as t);
             
                DECLARE cusCur2 CURSOR FOR (SELECT productName, marketName, price
                                                FROM Retails
                                     NATURAL JOIN Products
                                     NATURAL JOIN Markets
                                     NATURAL JOIN Categories
                                                WHERE marketName = 'Target Grocery'
                                                  AND productName IN (SELECT productName
                                                  FROM Retails
                                                           NATURAL JOIN Products
                                                  GROUP BY productName
                                                  HAVING AVG(price) > 1000));
                
                    DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop1 = TRUE;
                
                    DROP TABLE IF EXISTS discount;
                    CREATE TABLE discount
                    (
                        productName VARCHAR(64),
                        marketName  VARCHAR(64),
                        oldPrice    REAL,
                        newPrice    REAL
                    );
                    OPEN cusCur1;
                
                    cloop1 :
                    LOOP
                        FETCH cusCur1 INTO varProductName, varMarketName, varOldPrice;
                        IF (exit_loop1) THEN
                            LEAVE cloop1;
                        END IF;
                
                        IF (varMarketName = 'Walmart' AND varOldPrice < 10) THEN
                            SET varNewPrice = varOldPrice * 0.8;
                        ELSEIF (varMarketName = 'Costco' AND varOldPrice < 15) THEN
                            SET varNewPrice = varOldPrice * 0.7;
                        ELSE
                            SET varNewPrice = varOldPrice * 0.95;
                        END IF;
                        INSERT INTO discount VALUES (varProductName, varMarketName, ROUND(varOldPrice, 2), ROUND(varNewPrice, 2));
                    END LOOP cloop1;
                    CLOSE cusCur1;
                
                    SET exit_loop1 = FALSE;
                
                    OPEN cusCur2;
                    cloop2 :
                    LOOP
                        FETCH cusCur2 INTO varProductName, varMarketName, varOldPrice;
                        IF (exit_loop1) THEN
                            LEAVE cloop2;
                        END IF;
                
                        SET varNewPrice = varOldPrice - 100;
                        INSERT INTO discount VALUES (varProductName, varMarketName, ROUND(varOldPrice, 2), ROUND(varNewPrice, 2));
                    END LOOP cloop2;
                    CLOSE cusCur2;
                
                    SELECT * FROM discount LIMIT 50;
                
                END;
                """;
        jdbcTemplate.execute(sql);
    }
    public void dropStorageProcedure() {
        String sql = "DROP PROCEDURE IF EXISTS GetDiscount";
        jdbcTemplate.execute(sql);
    }

    @GetMapping("/procedure")
    public @ResponseBody List<ProcedureReturn> callStorageProcedure() {
        String sql = """
                CALL GetDiscount();
                """;
        return jdbcTemplate.query(sql, (rs, rowNum) -> new ProcedureReturn(
                rs.getDouble("oldPrice"),
                rs.getDouble("newPrice"),
                rs.getString("productName"),
                rs.getString("marketName")
        ));
    }

    @GetMapping("/procedure_test")
    public @ResponseBody List<ProcedureReturn> testStorageProcedure() {
        dropStorageProcedure();
        createStorageProcedure();
        String sql = """
                CALL GetDiscount();
                """;
        return jdbcTemplate.query(sql, (rs, rowNum) -> new ProcedureReturn(
                rs.getDouble("oldPrice"),
                rs.getDouble("newPrice"),
                rs.getString("productName"),
                rs.getString("marketName")
        ));
    }

}
