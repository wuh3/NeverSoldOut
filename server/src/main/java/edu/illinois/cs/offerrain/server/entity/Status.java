package edu.illinois.cs.offerrain.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Status {
    private int numOfLikes, numOfDislikes;
    private String productName, marketName;
    private Date timeStamp;
    private Boolean isInStock;
    private String statusId;

    public Status(String statusId, String productName, String marketName, int numOfLikes, int numOfDislikes, Date timeStamp, Boolean isInStock) {
        this.statusId = statusId;
        this.productName = productName;
        this.marketName = marketName;
        this.numOfDislikes = numOfDislikes;
        this.numOfLikes = numOfLikes;
        this.timeStamp = timeStamp;
        this.isInStock= isInStock;
    }

}
