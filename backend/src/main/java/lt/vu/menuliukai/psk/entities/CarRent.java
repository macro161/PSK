package lt.vu.menuliukai.psk.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter

@Entity
@NoArgsConstructor
@Table(name="CAR_RENT")
public class CarRent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    int price;

    String address;

}
