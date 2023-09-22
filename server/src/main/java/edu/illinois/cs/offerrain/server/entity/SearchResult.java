package edu.illinois.cs.offerrain.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchResult {
    /*
    "productName": "amrni",
    "marketName": "caffe paradiso",
    "location":"1010 W University Ave",
    "price": 5.14,
    "status": true,
    "statusTimeStamp": "Aug 22th 2022"
    */
    private double price;
    private String productName, marketName, location;
    private Date statusTimeStamp;
    private Boolean status;

    public SearchResult(String productName, String marketName, String location, double price, Boolean status, Date statusTimeStamp) {
        this.productName = productName;
        this.marketName = marketName;
        this.location = location;
        this.price = price;
        this.status = status;
        this.statusTimeStamp = statusTimeStamp;
    }

}
