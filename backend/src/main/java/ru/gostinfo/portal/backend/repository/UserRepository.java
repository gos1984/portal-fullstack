package ru.gostinfo.portal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.gostinfo.portal.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByUsername(String username);
}
