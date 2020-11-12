package ru.gostinfo.portal.backend.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import ru.gostinfo.portal.backend.entity.Project;
import ru.gostinfo.portal.backend.entity.Task;
import ru.gostinfo.portal.backend.service.ProjectService;
import ru.gostinfo.portal.backend.service.TaskService;

import java.time.LocalDateTime;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class TaskController {

    private ProjectService projectService;
    private TaskService taskService;

    @Autowired
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    @Autowired
    public void setTaskService(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/tasks")
    public Page<Task> tasks(@RequestParam(name = "page", defaultValue = "0") int page,
                            @RequestParam(name = "size", defaultValue = "10") int size,
                            @RequestParam(name = "sort", defaultValue = "id") String sort,
                            @RequestParam(name = "direction", defaultValue = "desc") String direction
    ) {

        return taskService.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction.equals("desc") ? "desc" : "asc"), sort)));
    }

    @GetMapping("/tasks/{id}")
    public Task task(@PathVariable Long id) {
        /*TODO:Create exception handler*/
        return taskService.findById(id);
    }

    @GetMapping("/{id}/tasks")
    public Page<Task> tasksByProject(@PathVariable Long id,
                                     @RequestParam(name = "page", defaultValue = "0") int page,
                                     @RequestParam(name = "size", defaultValue = "10") int size,
                                     @RequestParam(name = "sort", defaultValue = "id") String sort,
                                     @RequestParam(name = "direction", defaultValue = "desc") String direction
    ) {
        /*TODO:Create exception handler*/
        Project project = projectService.findById(id);

        return taskService.findAllByProject(project, PageRequest
                .of(page, size, Sort.by(Sort.Direction.fromString(direction.equals("desc") ? "desc" : "asc"), sort)));
    }

    @PostMapping("/tasks")
    public Task taskAdd(@RequestBody Task task) {
        task.setCreate(LocalDateTime.now());
        return taskService.save(task);
    }

    @PutMapping("/tasks")
    public Task taskUpdate(@RequestBody Task task) {
        task.setModification(LocalDateTime.now());
        return taskService.save(task);
    }

    @DeleteMapping("/tasks/{id}")
    public void taskDelete(@PathVariable Long id) {
        /*TODO:Create exception handler*/
        taskService.deleteById(id);
    }
}
