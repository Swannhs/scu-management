package com.university.library.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;
import java.time.LocalDateTime;

@Entity
@Table(name = "media_movements")
@Data
public class MediaMovement {
    @Id
    private UUID id = UUID.randomUUID();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "media_id", nullable = false)
    private Media media;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "media_unit_id", nullable = false)
    private MediaUnit mediaUnit;

    private String studentId;
    private String facultyId;

    @Column(nullable = false)
    private LocalDateTime issuedDate;

    @Column(nullable = false)
    private LocalDateTime returnDate;

    private LocalDateTime actualReturnDate;

    private Double penalty;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MovementState state = MovementState.ISSUED;
}
