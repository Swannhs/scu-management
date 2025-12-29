package com.university.library.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Entity
@Table(name = "authors")
@Data
public class Author {
    @Id
    private UUID id = UUID.randomUUID();

    @Column(nullable = false)
    private String name;
}
