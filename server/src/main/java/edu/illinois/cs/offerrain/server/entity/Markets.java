package edu.illinois.cs.offerrain.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Markets {
    private String marketId;
    private String name;
    private String location;
}
