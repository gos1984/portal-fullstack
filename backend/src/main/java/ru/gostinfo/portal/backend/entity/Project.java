package ru.gostinfo.portal.backend.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.apache.tomcat.jni.Local;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "project")
@Getter
@Setter
@NoArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description", columnDefinition = "text")
    private String description;

    @Column(name = "url")
    private String url;

    @Column(name = "status")
    @Enumerated(EnumType.ORDINAL)
    private StatusProject status;

    @OneToMany(mappedBy="project", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Task> tasks;

    @Column(name = "date_create")
    private LocalDateTime create;

    @Column(name = "date_modification")
    private LocalDateTime modification;

    public Project(String name, String description, String url) {
        this(name, description, url, StatusProject.NEW, LocalDateTime.now());
    }

    public Project(String name, String description, String url, StatusProject status) {
        this(name, description, url, status, LocalDateTime.now());
    }

    public Project(String name, String description, String url, StatusProject status, LocalDateTime create) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.status = status;
        this.create = create;
    }

    public void addTask(Task task) {
        if(tasks == null) {
            tasks = new ArrayList<>();
        }
        tasks.add(task);
        task.setProject(this);
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", url='" + url + '\'' +
                ", create=" + create +
                ", modification=" + modification +
                '}';
    }
}
