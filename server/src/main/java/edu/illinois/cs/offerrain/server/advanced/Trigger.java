package edu.illinois.cs.offerrain.server.advanced;

import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.sql.Types;
import java.util.*;

@RestController
@CrossOrigin
public class Trigger {

    @Autowired
    JdbcTemplate jdbcTemplate;
    public boolean isUpdateTriggerRunning = false;
    public boolean isInsertTriggerRunning = false;
    private final String USER_ID = "00000000000000000000000000000000";
    public void dropTriggerInsert() {
        String sql = """
                DROP TRIGGER IF EXISTS InsertLikes;
                """;

        try {
            jdbcTemplate.execute(sql);
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void dropTriggerUpdate() {
        String sql = """
                DROP TRIGGER IF EXISTS UpdateLikes;
                """;

        try {
            jdbcTemplate.execute(sql);
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void createInsertTrigger() {
        dropTriggerInsert();
        String sql = """
              CREATE TRIGGER InsertLikes
                            AFTER INSERT ON Likes
                            FOR EACH ROW
              BEGIN
                    IF new.sentiment = 1 THEN
                      UPDATE ProductStatus
                      SET numOfLikes = numOfLikes + 1
                      WHERE statusID = new.statusID;
                    ELSEIF new.sentiment = 0 THEN
                      UPDATE ProductStatus
                      SET numOfDislikes = numOfDislikes + 1
                      WHERE statusID = new.statusID;
                    END IF;
              END;       
        """;
        try {
            jdbcTemplate.execute(sql);
        } catch (Exception e) {
            System.out.println("Trigger execution failed due to: " + e);
        }
    }

    public void createUpdateTrigger() {
        dropTriggerUpdate();
        String sql = """
              CREATE TRIGGER UpdateLikes
                            AFTER UPDATE ON Likes
                            FOR EACH ROW
              BEGIN
                    IF new.sentiment = 1 AND old.sentiment = 0 THEN
                      UPDATE ProductStatus
                      SET numOfLikes = numOfLikes + 1,
                      numOfDislikes = numOfDislikes - 1
                      WHERE statusID = new.statusID;
                    ELSEIF new.sentiment = 0 AND old.sentiment = 1 THEN
                      UPDATE ProductStatus
                      SET numOfDislikes = numOfDislikes + 1,
                      numOfLikes = numOfLikes - 1
                      WHERE statusID = new.statusID;
                    END IF;
              END;       
        """;
        try {
            jdbcTemplate.execute(sql);
        } catch (Exception e) {
            System.out.println("Trigger execution failed due to: " + e);
        }
    }

    @PutMapping("/updateLikes")
    public @ResponseBody void createTrigger(@RequestBody Map<String, Object> input) {
        // execute query, if exists statusID, execute update query, otherwise execute insert query
        String statusId = input.get("statusId").toString();
        boolean sentiment = Boolean.parseBoolean(input.get("sentiment").toString());

        String updateSQL = """
                UPDATE Likes
                SET sentiment = ?
                WHERE statusID = ? AND userID = ?;
                """;
        String insertSQL = """
                INSERT INTO Likes
                VALUES (?,?,?);
                """;
        String sql = """
                SELECT statusID from Likes WHERE statusID = ?;
                """;
        List<String> ids = jdbcTemplate.query(sql, new Object[]{statusId}, (rs, rowNum) -> rs.getString("statusID"));
        System.out.println("statusId: " + statusId);
        System.out.println("sentiment: " + sentiment);

        if (ids != null && ids.size() != 0) {
            if (!isUpdateTriggerRunning) {
                dropTriggerUpdate();
                dropTriggerInsert();
                createUpdateTrigger();
                isUpdateTriggerRunning = true;
                isInsertTriggerRunning = false;
            }
            try {
                System.out.println("Update likes");
                jdbcTemplate.update(
                        updateSQL,
                        new Object[]{sentiment, statusId, USER_ID},
                        new int[]{Types.BOOLEAN, Types.VARCHAR, Types.VARCHAR}
                );
            } catch (Exception e) {
                System.out.println("Error on updating likes " + e);
            }
        } else {
            if (!isInsertTriggerRunning) {
                dropTriggerUpdate();
                dropTriggerInsert();
                createInsertTrigger();
                isUpdateTriggerRunning = false;
                isInsertTriggerRunning = true;
            }
            try {
                System.out.println("Insert likes");
                jdbcTemplate.update(
                        insertSQL,
                        new Object[]{statusId, USER_ID, sentiment},
                        new int[]{Types.VARCHAR, Types.VARCHAR, Types.BOOLEAN}
                );
            } catch (Exception e) {
                System.out.println("Error on inserting like " + e);
            }
        }

    }
}
