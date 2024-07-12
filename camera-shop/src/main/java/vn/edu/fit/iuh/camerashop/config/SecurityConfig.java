package vn.edu.fit.iuh.camerashop.config;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import vn.edu.fit.iuh.camerashop.entity.enums.Role;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserDetailsService userDetailsService;

    private static final String[] AUTH_WHITELIST = {
            "/swagger-resources/**",
            "/swagger-ui/**",
            "/v3/api-docs/**",
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.cors(Customizer.withDefaults());

        httpSecurity.authorizeHttpRequests(request -> {
            request
                    .requestMatchers(AUTH_WHITELIST).permitAll()

                    .requestMatchers("/auth/login",
                            "/auth/register")
                            .permitAll()

                    .requestMatchers(HttpMethod.GET, "/camera/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/brand/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/category/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/variant/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/feature/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/review/**").permitAll()

                    .requestMatchers(HttpMethod.POST, "/camera/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())
                    .requestMatchers(HttpMethod.PUT, "/camera/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())
                    .requestMatchers(HttpMethod.DELETE, "/camera/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())

                    .requestMatchers(HttpMethod.POST, "/brand/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())
                    .requestMatchers(HttpMethod.PUT, "/brand/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())
                    .requestMatchers(HttpMethod.DELETE, "/brand/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())

                    .requestMatchers(HttpMethod.POST, "/category/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())
                    .requestMatchers(HttpMethod.PUT, "/category/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())
                    .requestMatchers(HttpMethod.DELETE, "/category/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())

                    .requestMatchers(HttpMethod.POST, "/variant/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())
                    .requestMatchers(HttpMethod.PUT, "/variant/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())
                    .requestMatchers(HttpMethod.DELETE, "/variant/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())

                    .requestMatchers(HttpMethod.POST, "/feature/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())
                    .requestMatchers(HttpMethod.PUT, "/feature/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())
                    .requestMatchers(HttpMethod.DELETE, "/feature/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())

                    .requestMatchers(HttpMethod.POST, "/review/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())
                    .requestMatchers(HttpMethod.PUT, "/review/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())
                    .requestMatchers(HttpMethod.DELETE, "/review/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())

                    .requestMatchers(HttpMethod.POST, "/order/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())
                    .requestMatchers(HttpMethod.PUT, "/order/").hasAnyAuthority(Role.ADMIN.name(), Role.STAFF.name())

                    .anyRequest().authenticated();

        }).sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        httpSecurity.authenticationProvider(authenticationProvider());

        httpSecurity.httpBasic(httpBasic ->
                httpBasic.authenticationEntryPoint((request, response, authException) -> {
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.setContentType("application/json");
                    response.getWriter().write("{\n\tmessgae : \"" + authException.getMessage() + "\"\n}");
                }));

        httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        httpSecurity.httpBasic(Customizer.withDefaults());

        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }
}
