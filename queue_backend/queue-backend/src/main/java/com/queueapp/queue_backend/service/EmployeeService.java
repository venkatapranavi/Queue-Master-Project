package com.queueapp.queue_backend.service;

import com.queueapp.queue_backend.model.Employee;
import com.queueapp.queue_backend.model.QueueEntry;
import com.queueapp.queue_backend.model.dto.AdminEmployee;
import com.queueapp.queue_backend.repository.EmployeeRepository;
import com.queueapp.queue_backend.repository.QueueEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private QueueEntryRepository queueEntryRepository;

    public Optional<Employee> login(String username, String password) {
        Optional<Employee> employee = employeeRepository.findByUsername(username);
        return employee.filter(e -> e.getPassword().equals(password));
    }

    public List<QueueEntry> getWaitingQueue(String counterNumber) {
        return queueEntryRepository.findByCounterAssignedAndStatusOrderByTokenNumberAsc(counterNumber, "WAITING");
    }

    public QueueEntry serveNextCustomer(String counterNumber) {
        Optional<QueueEntry> next = queueEntryRepository
                .findTopByCounterAssignedAndStatusOrderByTokenNumberAsc(counterNumber, "WAITING");

        if (next.isPresent()) {
            QueueEntry entry = next.get();
            entry.setStatus("SERVED");
            return queueEntryRepository.save(entry);
        } else {
            System.out.println("No waiting customers found at counter: " + counterNumber);
        }
        return null;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee saveEmployee(Employee employee) {
        // Auto-generate password as "username@123"
        String generatedPassword = employee.getUsername() + "@123";
        employee.setPassword(generatedPassword);
        return employeeRepository.save(employee);
    }

    public List<AdminEmployee> getAdminEmployeeList() {
        return employeeRepository.findAll().stream()
                .map(emp -> new AdminEmployee(emp.getId(), emp.getUsername(), emp.getCounterNumber()))
                .collect(Collectors.toList());
    }

    public boolean deleteEmployee(Long id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Employee> updateEmployeeCounter(Long id, String counterNumber) {
        Optional<Employee> empOpt = employeeRepository.findById(id);
        if (empOpt.isPresent()) {
            Employee emp = empOpt.get();
            emp.setCounterNumber(counterNumber);
            return Optional.of(employeeRepository.save(emp));
        }
        return Optional.empty();
    }
}
