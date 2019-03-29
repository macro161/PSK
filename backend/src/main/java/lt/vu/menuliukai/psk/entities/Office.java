package lt.vu.menuliukai.psk.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


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
    @JsonIgnore
    List<ApartmentRoom> apartmentRooms;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "office")
    List<Trip> tripsToOffice;



}