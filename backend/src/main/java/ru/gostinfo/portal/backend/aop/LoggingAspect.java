package ru.gostinfo.portal.backend.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import ru.gostinfo.portal.backend.repository.ProjectRepository;
import ru.gostinfo.portal.backend.repository.TaskRepository;

import java.util.Arrays;

@Aspect
@Component
@Profile("dev")
public class LoggingAspect {

    private Logger logger = LoggerFactory.getLogger(LoggingAspect.class);
    private ProjectRepository projectRepository;
    private TaskRepository taskRepository;

    @Autowired
    public void setProjectRepository(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }
    @Autowired
    public void setTaskRepository(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Pointcut("execution(* ru.gostinfo.portal.backend.bootstrap.*.*(..))")
    private void forBootStrapPackage() {}

    @Pointcut("execution(* ru.gostinfo.portal.backend.rest.*.*(..))")
    private void forRestPackage() {}

    @Pointcut("execution(* ru.gostinfo.portal.backend.service.*.*(..))")
    private void forServicePackage() {}

    @AfterReturning(
            pointcut = "forBootStrapPackage()",
            returning = "result"
    )
    private void afterDataLoad(JoinPoint joinPoint, Object result) {
        logger.info("====>>> " + joinPoint.getSignature().toShortString());
        logger.info("====>>> Data Loaded");
        logger.info("====>>> Result loaded: projects is " + projectRepository.count() + ", tasks is " + taskRepository.count());
    }

    @Before("forRestPackage()")
    private void beforeRequestRest(JoinPoint joinPoint) {
        logger.info("====>>> Before request rest " + joinPoint.toShortString());
    }

    @AfterReturning(
            pointcut = "forRestPackage()",
            returning = "result"
    )
    private void afterRequestRest(JoinPoint joinPoint, Object result) {
        logger.info("====>>> After request rest " + joinPoint.getTarget().toString());
        logger.info("====>>> After request rest " + result);
    }

    @Before("forServicePackage()")
    private void beforeRequestService(JoinPoint joinPoint) {

        logger.info("====>>> Before request service " + joinPoint.toShortString());
        logger.info("====>>> Before request service " + Arrays.toString(joinPoint.getArgs()));
    }

    @AfterReturning(
            pointcut = "forServicePackage()",
            returning = "result"
    )
    private void afterRequestService(JoinPoint joinPoint, Object result) {
        logger.info("====>>> After request service " + joinPoint.getTarget().toString());
        logger.info("====>>> After request service " + result);
    }

}
