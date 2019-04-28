package lt.vu.menuliukai.psk;

import lt.vu.menuliukai.psk.entities.Trip;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.type.MappedTypes;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@MappedTypes(Trip.class)
@MapperScan("lt.vu.menuliukai.psk.mappers")
@SpringBootApplication
public class PskApplication {

    public static void main(String[] args) {
        SpringApplication.run(PskApplication.class, args);
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory() throws Exception {
        return new SqlSessionFactoryBuilder().build(
                ClassLoader.class.getResourceAsStream("MyBatisConfig.xml")
        );
    }
}
