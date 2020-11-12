package ru.gostinfo.portal.backend.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "task")
@Getter
@Setter
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description", columnDefinition = "text")
    private String description;

    @Column(name="completed")
    private Boolean completed;

    @Column(name = "priority")
    @Enumerated(EnumType.ORDINAL)
    private PriorityTask priority;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    @JsonBackReference
    private Project project;

    @Column(name = "date_create")
    private LocalDateTime create;

    @Column(name = "date_modification")
    private LocalDateTime modification;

    public Task(String name, String description) {
        this(name, description, PriorityTask.MIDDLE, LocalDateTime.now());
    }

    public Task(String name, String description, PriorityTask status) {
        this(name, description, status, LocalDateTime.now());
    }

    public Task(String name, String description, PriorityTask status, LocalDateTime create) {
        this.name = name;
        this.description = description;
        this.priority = status;
        this.create = create;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", completed=" + completed +
                ", create=" + create +
                ", modification=" + modification +
                '}';
    }
}
