package edu.illinois.cs.offerrain.server.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Complex1 {
    public String marketName;
    public String productName;
    public String location;
    public Double price;
}
