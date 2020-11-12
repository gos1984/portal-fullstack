package ru.gostinfo.portal.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests(authorize -> {
            authorize
                    .antMatchers("/login", "/error").permitAll()
                    .antMatchers("/api/**").hasAnyRole("ADMIN", "EMPLOYEE");
        })
                .authorizeRequests()
                .anyRequest().authenticated()
                .and().cors()
                .and()
                .httpBasic()
                .and().csrf().disable();
    }

}
