package edu.illinois.cs.offerrain.server.entity;

public class Pair {
    public String key;
    public String value;

    public Pair(String key, String value) {
        this.key = key;
        this.value = value;
    }

    @Override
    public String toString() {
        return "Pair{" +
                "key='" + key + '\'' +
                ", value='" + value + '\'' +
                '}';
    }
}
