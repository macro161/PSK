package lt.vu.menuliukai.psk.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;
import lt.vu.menuliukai.psk.converters.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode()
@ToString
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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn
    @JsonProperty("trip_checklist")
    private TripChecklist tripChecklist;

    @ManyToOne
    @JoinColumn
    @JsonProperty("apartments_room")
    private ApartmentRoom apartmentRoom;       // one of these should be null at all cases

    @ManyToOne(cascade = CascadeType.ALL)         // maybe there is a better solution for this.
    @JoinColumn
    @JsonProperty("hotel")
    private Hotel hotel;

    @OneToOne(cascade = CascadeType.ALL)
    private Flight flight;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonProperty("car_rent")
    private CarRent carRent;

    Boolean approved;

    public EmployeeTrip(Employee employee, Trip trip, TripChecklist tripChecklist, ApartmentRoom apartmentRoom, Hotel hotel, Flight flight, CarRent carRent, Boolean approved){
        this.employee = employee;
        this.trip = trip;
        this.tripChecklist = tripChecklist;
        this.apartmentRoom = apartmentRoom;
        this.hotel = hotel;
        this.flight = flight;
        this.carRent = carRent;
        this.id = new EmployeeTripId(employee.getId(), trip.getId());
        this.approved = approved;
    }
}
