package edu.illinois.cs.offerrain.server.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Retails {
    private String retailId;
    private String marketId;
    private String marketName;
    private String productId;
    private String productName;
    private Double price;
}
