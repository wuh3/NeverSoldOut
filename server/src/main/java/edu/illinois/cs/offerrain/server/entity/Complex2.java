package edu.illinois.cs.offerrain.server.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Complex2 {
    public String marketName;
    public int numOfLikes;
    public int numOfUsers;
}
