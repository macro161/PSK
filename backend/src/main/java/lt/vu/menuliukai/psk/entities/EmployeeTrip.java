package lt.vu.menuliukai.psk.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode()
public class EmployeeTrip implements Serializable {

    @EmbeddedId
    private EmployeeTripId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("employeeId")
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("tripId")
    private Trip trip;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private TripChecklist tripChecklist;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private ApartmentRoom apartmentRoom;       // one of these should be null at all cases

    @ManyToOne(fetch = FetchType.LAZY)         // maybe there is a better solution for this.
    @JoinColumn
    private Hotel hotel;

    @OneToOne
    @JoinColumn
    private Flight flight;

    @OneToOne
    @JoinColumn
    private CarRent carRent;

    public EmployeeTrip(Employee employee, Trip trip){
        this.employee = employee;
        this.trip = trip;
        this.id = new EmployeeTripId(employee.getId(), trip.getId());
    }
}
