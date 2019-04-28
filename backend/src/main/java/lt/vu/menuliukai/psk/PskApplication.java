package lt.vu.menuliukai.psk;

import lt.vu.menuliukai.psk.entities.Trip;
import org.apache.ibatis.type.MappedTypes;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MappedTypes(Trip.class)
@MapperScan("lt.vu.menuliukai.psk.mappers")
@SpringBootApplication
public class PskApplication {

    public static void main(String[] args) {
        SpringApplication.run(PskApplication.class, args);
    }

}
