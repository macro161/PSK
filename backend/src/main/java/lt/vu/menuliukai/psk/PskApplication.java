package lt.vu.menuliukai.psk;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

@MapperScan("lt.vu.menuliukai.psk.mappers")
@SpringBootApplication
public class PskApplication {

    public static void main(String[] args) {
        SpringApplication.run(PskApplication.class, args);
    }

    public static String getUserRole() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection<GrantedAuthority> roles = user.getAuthorities();
        return String.valueOf(roles.iterator().next());
    }
}
