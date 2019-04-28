package lt.vu.menuliukai.psk;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("lt.vu.menuliukai.psk.mappers")
@SpringBootApplication
public class PskApplication {

    public static void main(String[] args) {
        SpringApplication.run(PskApplication.class, args);
    }

}
