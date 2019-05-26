package lt.vu.menuliukai.psk;

import lt.vu.menuliukai.psk.dao.StatisticsDao;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@MapperScan("lt.vu.menuliukai.psk.mappers")
@SpringBootApplication
@EnableAspectJAutoProxy
public class PskApplication {

    public static void main(String[] args) {
        SpringApplication.run(PskApplication.class, args);
    }

    public static User getUser() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        if (securityContext == null) {
            return null;
        }
        Authentication authentication = securityContext.getAuthentication();
        if (authentication == null) {
            return null;
        }

        return (User) authentication.getPrincipal();
    }

    public static String getUsername() {
        User user = getUser();
        if (getUser() == null) {
            return "anonymous";
        } else {
            return user.getUsername();
        }
    }

    public static String getUserRole() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection<GrantedAuthority> roles = user.getAuthorities();
        return String.valueOf(roles.iterator().next());
    }

    @Autowired
    private ApplicationContext context;

    @Bean
    public StatisticsDao StatisticsService(@Value("${service.class}") String qualifier) {
        return (StatisticsDao) context.getBean(qualifier);
    }
}
