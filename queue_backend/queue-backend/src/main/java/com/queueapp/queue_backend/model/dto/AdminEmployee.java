package com.queueapp.queue_backend.model.dto;

public class AdminEmployee {

    private Long id;
    private String username;
    private String counterNumber;

    public AdminEmployee(Long id, String username, String counterNumber) {
        this.id = id;
        this.username = username;
        this.counterNumber = counterNumber;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getCounterNumber() {
        return counterNumber;
    }
}
