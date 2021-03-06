package lt.vu.menuliukai.psk.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter @Setter

@Entity

@NoArgsConstructor
@Table(name="HOTEL")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    String name;

    String address;

    int roomNo;

    int price;
}
