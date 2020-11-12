package ru.gostinfo.portal.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ru.gostinfo.portal.backend.entity.Task;

import java.util.List;

public interface MainService<T> {

    List<T> findAll();

    Page<T> findAll(Pageable pageable);

    T findById(Long id);

    T save(T t);

    void deleteById(Long id);

}
