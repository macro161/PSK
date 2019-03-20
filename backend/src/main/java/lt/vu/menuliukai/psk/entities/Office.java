package lt.vu.menuliukai.psk.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
public class Office {
    @Getter
    @Setter
    long id;

    @Getter
    @Setter

    String city;

    @Getter
    @Setter
    String address;
}