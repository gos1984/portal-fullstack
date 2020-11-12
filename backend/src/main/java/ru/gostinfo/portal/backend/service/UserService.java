package ru.gostinfo.portal.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.gostinfo.portal.backend.entity.Authority;
import ru.gostinfo.portal.backend.entity.User;
import ru.gostinfo.portal.backend.repository.UserRepository;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Transactional
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        User user = userRepository.findUserByUsername(s);

        if (user == null) {
            throw new UsernameNotFoundException("This user not found");
        }

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.isEnabled(),
                user.isAccountNonExpired(),
                user.isCredentialsNonExpired(),
                user.isAccountNonLocked(),
                convertToAuthorities(user.getAuthorities()));
    }


    public UserDetails authenticate(User user) {
            UserDetails userDetails = loadUserByUsername(user.getUsername());

            if(passwordEncoder().matches(user.getPassword(), userDetails.getPassword())) {
                return userDetails;
            }

            return null;
    }

    public User findByUser(String username) {
        return userRepository.findUserByUsername(username);
    }

    private Collection<? extends GrantedAuthority> convertToAuthorities(Set<Authority> authorities) {
        if (authorities != null && authorities.size() > 0) {
            return authorities.stream()
                    .map(Authority::getRole)
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toSet());
        }
        return new HashSet<>();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
