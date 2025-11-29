package com.queueapp.queue_backend.model.dto;

import java.time.LocalDateTime;

public class QueueEntryResponse {
    private String fullName;
    private String phoneNumber;
    private String email;
    private int tokenNumber;
    private String counterAssigned;
    private LocalDateTime createdAt;
    private String status;
    private int estimatedWaitTime;

    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public int getTokenNumber() {
        return tokenNumber;
    }
    public void setTokenNumber(int tokenNumber) {
        this.tokenNumber = tokenNumber;
    }

    public String getCounterAssigned() {
        return counterAssigned;
    }
    public void setCounterAssigned(String counterAssigned) {
        this.counterAssigned = counterAssigned;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public int getEstimatedWaitTime() {
        return estimatedWaitTime;
    }
    public void setEstimatedWaitTime(int estimatedWaitTime) {
        this.estimatedWaitTime = estimatedWaitTime;
    }
}
