package edu.illinois.cs.offerrain.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProcedureReturn {


    private Double oldPrice, newPrice;
    private String productName, marketName;

    public String toString() {
        return "oldPrice = " + oldPrice + ", newPrice = " + newPrice + ", productName = " + productName + ", marketName = " + marketName;
    }
}
