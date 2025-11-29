package com.queueapp.queue_backend.controller;

import com.queueapp.queue_backend.model.dto.QueueEntryRequest;
import com.queueapp.queue_backend.model.dto.QueueEntryResponse;
import com.queueapp.queue_backend.service.QueueEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/queue")
public class QueueEntryController {

    @Autowired
    private QueueEntryService queueEntryService;

    @GetMapping("/")
    public String home() {
        return "Welcome to QueueMaster Backend!";
    }

    @PostMapping("/join-queue")
    public ResponseEntity<QueueEntryResponse> joinQueue(@RequestBody QueueEntryRequest request) {
        QueueEntryResponse savedEntry = queueEntryService.joinQueue(request);
        return ResponseEntity.ok(savedEntry);
    }

    @GetMapping("/all")
    public List<QueueEntryResponse> getAllEntries() {
        return queueEntryService.getAllQueueEntries();
    }

    @GetMapping("/status/{tokenNumber}")
    public ResponseEntity<QueueEntryResponse> getStatus(@PathVariable Integer tokenNumber) {
        QueueEntryResponse entry = queueEntryService.getQueueEntryByToken(tokenNumber);
        return ResponseEntity.ok(entry);
    }

    @PutMapping("/complete/{tokenNumber}")
    public ResponseEntity<String> completeQueueEntry(@PathVariable Integer tokenNumber) {
        queueEntryService.completeEntryByToken(tokenNumber);
        return ResponseEntity.ok("Queue entry marked as SERVED and email sent.");
    }

}
