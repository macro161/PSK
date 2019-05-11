package lt.vu.menuliukai.psk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@EnableWebSecurity
@ComponentScan("lt.vu.menuliukai.psk")
public class SecurityConfig extends WebSecurityConfigurerAdapter{

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //http.authorizeRequests().anyRequest().permitAll();
        http.cors().and().csrf().disable();

        http
            .authorizeRequests()
                .antMatchers("/public/**", "/signup", "/saveuser").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .permitAll()
                .successHandler(successHandler())
                .failureHandler(failureHandler())
                .and()
            .httpBasic()
                .and()
            .csrf().disable()
            .logout()
        .logoutSuccessUrl("/")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID");
    }

    private AuthenticationSuccessHandler successHandler() {
        return (httpServletRequest, httpServletResponse, authentication) -> {
            User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Object role = user.getAuthorities().toArray()[0];

            String sessionId = RequestContextHolder.currentRequestAttributes().getSessionId();
            String responseJson = String.format("{ \"JSESSIONID\": \"%s\", \"role\": \"%s\" }", sessionId, role);


            httpServletResponse.setContentType("application/json");
            httpServletResponse.setCharacterEncoding("UTF-8");
            httpServletResponse.setStatus(200);


            httpServletResponse.getWriter().append(responseJson);
        };
    }

    private AuthenticationFailureHandler failureHandler() {
        return (httpServletRequest, httpServletResponse, e) -> {
            httpServletResponse.getWriter().append("Authentication failure");
            httpServletResponse.setStatus(401);
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public LogoutSuccessHandler logoutSuccessHandler() {
        return new SimpleUrlLogoutSuccessHandler();
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}