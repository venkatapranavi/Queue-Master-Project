package com.queueapp.queue_backend.controller;

import com.queueapp.queue_backend.model.Employee;
import com.queueapp.queue_backend.model.QueueEntry;
import com.queueapp.queue_backend.model.dto.AdminEmployee;
import com.queueapp.queue_backend.model.dto.EmployeeLoginResponse;
import com.queueapp.queue_backend.service.EmployeeService;
import com.queueapp.queue_backend.service.QueueEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private QueueEntryService queueEntryService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        Optional<Employee> employee = employeeService.login(username, password);
        return employee.<ResponseEntity<?>>map(e -> {
            EmployeeLoginResponse response = new EmployeeLoginResponse(
                    e.getUsername(),
                    e.getCounterNumber(),
                    "Welcome, " + e.getUsername() + "! You are assigned to Counter " + e.getCounterNumber() + "."
            );
            return ResponseEntity.ok(response);
        }).orElseGet(() -> ResponseEntity.status(401).body("Invalid credentials"));
    }

    @GetMapping("/queue-list")
    public ResponseEntity<List<QueueEntry>> getQueue(@RequestParam String counterNumber) {
        List<QueueEntry> queueEntryList = employeeService.getWaitingQueue(counterNumber);
        return ResponseEntity.ok(queueEntryList);
    }

    @GetMapping("/peek-next-customer")
    public ResponseEntity<?> peekNextCustomer(@RequestParam String counterNumber) {
        Optional<QueueEntry> customer = queueEntryService.peekNextCustomer(counterNumber);
        return customer.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PostMapping("/next-customer")
    public ResponseEntity<QueueEntry> callNextCustomer(@RequestParam String counterNumber) {
        QueueEntry servedEntry = employeeService.serveNextCustomer(counterNumber);
        if (servedEntry != null) {
            return ResponseEntity.ok(servedEntry);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee saved = employeeService.saveEmployee(employee);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        boolean deleted = employeeService.deleteEmployee(id);
        if (deleted) {
            return ResponseEntity.ok("Employee deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update-counter/{id}")
    public ResponseEntity<Employee> updateCounter(@PathVariable Long id, @RequestParam String counterNumber) {
        Optional<Employee> updated = employeeService.updateEmployeeCounter(id, counterNumber);
        return updated.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/all-for-admin")
    public ResponseEntity<List<AdminEmployee>> getAdminViewEmployees() {
        List<AdminEmployee> adminEmployeeList = employeeService.getAdminEmployeeList();
        return ResponseEntity.ok(adminEmployeeList);
    }
}
