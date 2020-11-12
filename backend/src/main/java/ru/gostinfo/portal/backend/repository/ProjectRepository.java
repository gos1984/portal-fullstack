package ru.gostinfo.portal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.gostinfo.portal.backend.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
