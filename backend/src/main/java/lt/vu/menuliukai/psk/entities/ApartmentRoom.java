package lt.vu.menuliukai.psk.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.vu.menuliukai.psk.converters.ApartmentsConverter;
import lt.vu.menuliukai.psk.converters.IdObjectToLongConverter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter

@Entity
@NoArgsConstructor
@Table(name="APARTMENT_ROOM")
public class ApartmentRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    int roomNo;

    @OneToMany(mappedBy = "apartmentRoom")
    @JsonIgnore
    private Set<EmployeeTrip> employeeTrips = new HashSet<>();;

    @ManyToOne
    @JoinColumn
    @JsonSerialize(converter = IdObjectToLongConverter.class)
    @JsonDeserialize(converter = ApartmentsConverter.class)
    @JsonProperty("apartments")
    private Apartments apartments;
}
