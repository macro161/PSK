package lt.vu.menuliukai.psk.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;
import lt.vu.menuliukai.psk.converters.EmployeeConverter;
import lt.vu.menuliukai.psk.converters.IdObjectToLongConverter;
import lt.vu.menuliukai.psk.converters.OfficeConverter;
import lt.vu.menuliukai.psk.converters.TripConverter;

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
    @JsonSerialize(converter = IdObjectToLongConverter.class)
    @JsonDeserialize(converter = EmployeeConverter.class)
    @JsonProperty("employee")
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("tripId")
    @JsonSerialize(converter = IdObjectToLongConverter.class)
    @JsonDeserialize(converter = TripConverter.class)
    @JsonProperty("trip")
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

    public EmployeeTrip(Employee employee, Trip trip, TripChecklist tripChecklist, ApartmentRoom apartmentRoom, Hotel hotel, Flight flight, CarRent carRent){
        this.employee = employee;
        this.trip = trip;
        this.tripChecklist = tripChecklist;
        this.apartmentRoom = apartmentRoom;
        this.hotel = hotel;
        this.flight = flight;
        this.carRent = carRent;
        this.id = new EmployeeTripId(employee.getId(), trip.getId());
    }
}
