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

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "office_apartment_id", nullable = false)
    @JsonIgnore
    OfficeApartment officeApartment;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "office")
    List<Trip> tripsToOffice;


}