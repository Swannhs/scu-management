package com.university.library.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "media")
@Data
public class Media {
    @Id
    private UUID id = UUID.randomUUID();

    @Column(nullable = false)
    private String title;

    @Column(unique = true)
    private String isbn;

    @ManyToMany
    @JoinTable(name = "media_authors", joinColumns = @JoinColumn(name = "media_id"), inverseJoinColumns = @JoinColumn(name = "author_id"))
    private Set<Author> authors;

    @ManyToMany
    @JoinTable(name = "media_publishers", joinColumns = @JoinColumn(name = "media_id"), inverseJoinColumns = @JoinColumn(name = "publisher_id"))
    private Set<Publisher> publishers;

    @ManyToMany
    @JoinTable(name = "media_tags", joinColumns = @JoinColumn(name = "media_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags;

    @Column(nullable = false)
    private String typeId; // e.g. Book, CD, Journal

    @OneToMany(mappedBy = "media", cascade = CascadeType.ALL)
    private List<MediaUnit> units;

    @OneToMany(mappedBy = "media", cascade = CascadeType.ALL)
    private List<MediaMovement> movements;
}
