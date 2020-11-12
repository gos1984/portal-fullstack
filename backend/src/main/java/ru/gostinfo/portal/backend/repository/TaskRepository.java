package ru.gostinfo.portal.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.gostinfo.portal.backend.entity.Project;
import ru.gostinfo.portal.backend.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findAllByProject(Project project, Pageable pageable);
}
