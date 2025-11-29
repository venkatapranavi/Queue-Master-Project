package com.queueapp.queue_backend.service;

import com.queueapp.queue_backend.model.Employee;
import com.queueapp.queue_backend.model.QueueEntry;
import com.queueapp.queue_backend.model.dto.QueueEntryRequest;
import com.queueapp.queue_backend.model.dto.QueueEntryResponse;
import com.queueapp.queue_backend.repository.EmployeeRepository;
import com.queueapp.queue_backend.repository.QueueEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QueueEntryService {

    @Autowired
    private QueueEntryRepository queueEntryRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmailNotificationService emailNotificationService;

    public QueueEntryResponse joinQueue(QueueEntryRequest request) {

        QueueEntry entry = new QueueEntry();
        entry.setFullName(request.getFullName());
        entry.setEmail(request.getEmail());
        entry.setPhoneNumber(request.getPhoneNumber());

        int nextToken = queueEntryRepository.findMaxTokenNumber().orElse(0) + 1;
        entry.setTokenNumber(nextToken);

        List<Employee> employees = employeeRepository.findAll();
        String assignedCounter;
        if (!employees.isEmpty()) {
            assignedCounter = employees.get(nextToken % employees.size()).getCounterNumber();
            entry.setCounterAssigned(assignedCounter);
        } else {
            assignedCounter = "Unassigned";
            entry.setCounterAssigned(assignedCounter);
        }

        entry.setCreatedAt(LocalDateTime.now());
        entry.setStatus("WAITING");

        queueEntryRepository.save(entry);

        // 🔥 Predict estimated wait time
        int estimatedWaitTime = estimateWaitTime(assignedCounter);

        // 📨 Send email with estimated time
        emailNotificationService.sendTokenNotification(
                entry.getEmail(),
                entry.getTokenNumber(),
                assignedCounter,
                entry.getCreatedAt().toString(),
                estimatedWaitTime
        );

        // ⬅ Return response with estimated wait time
        QueueEntryResponse response = mapToResponse(entry);
        response.setEstimatedWaitTime(estimatedWaitTime);
        return response;
    }

    public Optional<QueueEntry> peekNextCustomer(String counterNumber) {
        return queueEntryRepository.findFirstByCounterAssignedAndStatusOrderByTokenNumberAsc(counterNumber, "WAITING");
    }

    public List<QueueEntryResponse> getAllQueueEntries() {
        return queueEntryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public QueueEntryResponse getQueueEntryByToken(Integer tokenNumber) {
        QueueEntry entry = queueEntryRepository.findByTokenNumber(tokenNumber)
                .orElseThrow(() -> new RuntimeException("Token number not found"));

        return mapToResponse(entry);
    }

    public void completeEntryByToken(Integer tokenNumber) {
        QueueEntry entry = queueEntryRepository.findByTokenNumber(tokenNumber)
                .orElseThrow(() -> new RuntimeException("Entry not found"));

        entry.setStatus("SERVED");
        queueEntryRepository.save(entry);

        emailNotificationService.sendCompletionNotification(entry.getEmail(), entry.getTokenNumber());
    }

    private QueueEntryResponse mapToResponse(QueueEntry entry) {
        QueueEntryResponse response = new QueueEntryResponse();
        response.setFullName(entry.getFullName());
        response.setEmail(entry.getEmail());
        response.setPhoneNumber(entry.getPhoneNumber());
        response.setTokenNumber(entry.getTokenNumber());
        response.setCounterAssigned(entry.getCounterAssigned());
        response.setCreatedAt(entry.getCreatedAt());
        response.setStatus(entry.getStatus());
        return response;
    }

    private int estimateWaitTime(String counterNumber) {
        int waitingCount = queueEntryRepository.countByCounterAssignedAndStatus(counterNumber, "WAITING");

        double avgServiceTimePerCustomer = 4.5; // in minutes — this can be made dynamic later

        return (int) Math.ceil(waitingCount * avgServiceTimePerCustomer);
    }
}
