package ru.gostinfo.portal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.gostinfo.portal.backend.entity.Authority;

public interface RoleRepository extends JpaRepository<Authority, Long> {
}
