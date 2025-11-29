package com.queueapp.queue_backend.repository;

import com.queueapp.queue_backend.model.QueueEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface QueueEntryRepository extends JpaRepository<QueueEntry,Long> {
    Optional<QueueEntry> findByTokenNumber(Integer tokenNumber);

    @Query("SELECT MAX(q.tokenNumber) FROM QueueEntry q")
    Optional<Integer> findMaxTokenNumber();

    List<QueueEntry> findByCounterAssignedAndStatusOrderByTokenNumberAsc(String counterAssigned, String status);
    Optional<QueueEntry> findTopByCounterAssignedAndStatusOrderByTokenNumberAsc(String counterAssigned, String status);

    Optional<QueueEntry> findFirstByCounterAssignedAndStatusOrderByTokenNumberAsc(String counterAssigned, String status);
    int countByCounterAssignedAndStatus(String counterAssigned, String status);
}
