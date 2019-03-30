package lt.vu.menuliukai.psk.entities;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="OFFICE")
public class Office {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    String city;

    String address;

    @OneToMany(mappedBy = "office")
    List<ApartmentRoom> apartmentRooms;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "toOffice")
    List<Trip> tripsToOffice;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "fromOffice")
    List<Trip> tripsFromOffice;
}