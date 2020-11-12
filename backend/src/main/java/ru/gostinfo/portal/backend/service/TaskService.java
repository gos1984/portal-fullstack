package ru.gostinfo.portal.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.gostinfo.portal.backend.entity.Project;
import ru.gostinfo.portal.backend.entity.Task;
import ru.gostinfo.portal.backend.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService implements MainService<Task> {
    
    private TaskRepository taskRepository;

    @Autowired
    public void setTaskRepository(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public Page<Task> findAll(Pageable pageable) {
        return taskRepository.findAll(pageable);
    }

    public Task findById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public Task save(Task Task) {
        return taskRepository.save(Task);
    }

    public void deleteById(Long id) {

        if(findById(id) != null) {
            taskRepository.deleteById(id);
        }
    }

    public Page<Task> findAllByProject(Project project, Pageable pageable) {
        return taskRepository.findAllByProject(project, pageable);
    }
}
