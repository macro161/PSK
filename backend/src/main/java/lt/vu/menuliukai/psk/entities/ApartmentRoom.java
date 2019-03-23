package lt.vu.menuliukai.psk.entities;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="ROOM")
public class ApartmentRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    int space; // Don't know how to name this

    @ManyToOne
    OfficeApartment officeApartment;
}