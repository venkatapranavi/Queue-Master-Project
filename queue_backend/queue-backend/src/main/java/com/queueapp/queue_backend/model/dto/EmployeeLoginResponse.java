package com.queueapp.queue_backend.model.dto;

public class EmployeeLoginResponse {
    private String username;
    private String counterNumber;
    private String message;

    public EmployeeLoginResponse(String username, String counterNumber, String message) {
        this.username = username;
        this.counterNumber = counterNumber;
        this.message = message;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getCounterNumber() {
        return counterNumber;
    }
    public void setCounterNumber(String counterNumber) {
        this.counterNumber = counterNumber;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}
