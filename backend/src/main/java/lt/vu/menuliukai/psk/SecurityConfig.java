package lt.vu.menuliukai.psk;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // currently no security
        http.authorizeRequests().anyRequest().permitAll();
        // to allow usage of curl
        // https://stackoverflow.com/questions/50486314/how-to-solve-403-error-in-spring-boot-post-request/50491615
        http.cors().and().csrf().disable();
    }
}