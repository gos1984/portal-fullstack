package ru.gostinfo.portal.backend.bootstrap;

import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.gostinfo.portal.backend.entity.*;
import ru.gostinfo.portal.backend.repository.ProjectRepository;
import ru.gostinfo.portal.backend.repository.RoleRepository;
import ru.gostinfo.portal.backend.repository.TaskRepository;
import ru.gostinfo.portal.backend.repository.UserRepository;

import java.util.Random;

@Component
@Profile("dev")
public class BootStrapData implements ApplicationRunner {

    private PasswordEncoder passwordEncoder;
    private ProjectRepository projectRepository;
    private TaskRepository taskRepository;
    private UserRepository userRepository;
    private RoleRepository roleRepository;

    @Autowired
    public void setProjectRepository(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Autowired
    public void setTaskRepository(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Faker faker = new Faker();
        StatusProject[] statusProjects = StatusProject.values();
        PriorityTask[] statusTasks = PriorityTask.values();
        Random random = new Random();

        Authority admin = new Authority("ROLE_ADMIN");
        Authority employee = new Authority("ROLE_EMPLOYEE");
        roleRepository.save(admin);
        roleRepository.save(employee);

        User userAdmin = new User("Admin", "Admin", "Developer", "+7 (999) 999-99-99", "admin@admin.ru", "admin", this.passwordEncoder.encode("admin"), true);
        userAdmin.getAuthorities().add(admin);
        userAdmin = userRepository.save(userAdmin);
        userRepository.save(userAdmin);



        for(int i = 1; i < 6; i++) {
            User user = new User(
                    faker.name().firstName(),
                    faker.name().lastName(),
                    faker.company().profession(),
                    faker.phoneNumber().phoneNumber(),
                    faker.internet().emailAddress(),
                    faker.name().username(),
                    this.passwordEncoder.encode("123123"),
                    true);
            user.getAuthorities().add(employee);
            userRepository.save(user);
        }



        for(int i = 0; i < 30; i++) {
            Project project = new Project(
                    faker.lorem().word(),
                    faker.lorem().paragraph(),
                    faker.internet().url(),
                    statusProjects[random.nextInt(statusProjects.length)]
            );
            projectRepository.save(project);
            for (int j = 0; j < 30; j++) {
                Task task = new Task(
                        faker.lorem().paragraph(1),
                        faker.lorem().paragraph(),
                        statusTasks[random.nextInt(statusTasks.length)]
                );
                task.setCompleted(random.nextBoolean());
                project.addTask(task);
                taskRepository.save(task);
            }

        }
    }
}
