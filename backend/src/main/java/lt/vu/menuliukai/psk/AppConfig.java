package lt.vu.menuliukai.psk;

import lt.vu.menuliukai.psk.dao.StatisticsDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@EnableAspectJAutoProxy
public class AppConfig {

    @Autowired
    private ApplicationContext context;

    @Bean
    public StatisticsDao StatisticsService(@Value("${service.class}") String qualifier) {
        return (StatisticsDao) context.getBean(qualifier);
    }
}
