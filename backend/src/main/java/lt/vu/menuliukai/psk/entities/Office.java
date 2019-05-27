package lt.vu.menuliukai.psk.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter @Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="OFFICE")
public class Office {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    @Version
    Long version;

    String city;

    String address;

    String aptAddress;

    int aptSize;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "toOffice")
    Set<Trip> tripsToOffice = new HashSet<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "fromOffice")
    Set<Trip> tripsFromOffice = new HashSet<>();

    @OneToMany(cascade=CascadeType.ALL, mappedBy = "office")
    @JsonIgnore
    Set<ApartmentRoom> apartmentRooms = new HashSet<>();
}