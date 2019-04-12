package lt.vu.menuliukai.psk.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
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
    private Set<EmployeeTrip> employeeTrips;

    @ManyToOne
    @JoinColumn
    private Apartments apartments;
}
