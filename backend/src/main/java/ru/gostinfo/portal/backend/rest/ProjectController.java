package ru.gostinfo.portal.backend.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import ru.gostinfo.portal.backend.entity.Project;
import ru.gostinfo.portal.backend.service.ProjectService;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ProjectController {

    private ProjectService projectService;

    @Autowired
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/projects")
    public Page<Project> projects(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sort", defaultValue = "id") String sort,
            @RequestParam(name = "direction", defaultValue = "desc") String direction
    ) {
        return projectService.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction.equals("desc") ? "desc" : "asc"), sort)));
    }

    @GetMapping("/projects/list")
    public List<Project> projects(Principal principal) {
        return projectService.findAll();
    }

    @GetMapping("/projects/{id}")
    public Project project(@PathVariable Long id) {
        /*TODO:Create exception handler*/
        return projectService.findById(id);
    }

    @PostMapping("/projects")
    public Project projectAdd(@RequestBody Project project) {
        project.setCreate(LocalDateTime.now());
        return projectService.save(project);
    }

    @PutMapping("/projects")
    public Project projectUpdate(@RequestBody Project project) {
        project.setModification(LocalDateTime.now());
        return projectService.save(project);
    }

    @DeleteMapping("/projects/{id}")
    public void projectDelete(@PathVariable Long id) {
        /*TODO:Create exception handler*/
        projectService.deleteById(id);
    }
}
