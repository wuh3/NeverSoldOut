package edu.illinois.cs.offerrain.server.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Products {
    private String productId;
    private String categoryId;
    private String name;
}
