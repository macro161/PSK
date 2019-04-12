package lt.vu.menuliukai.psk.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Getter @Setter
@NoArgsConstructor

@Entity
@EqualsAndHashCode()
public class EmployeeTrip implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn
    private Employee employee;

    @Id
    @ManyToOne
    @JoinColumn
    private Trip trip;

    @ManyToOne
    @JoinColumn
    private TripChecklist tripChecklist;

    @ManyToOne
    @JoinColumn
    private ApartmentRoom apartmentRoom;       // one of these should be null at all cases

    @ManyToOne                                  // maybe there is a better solution for this.
    @JoinColumn
    private Hotel hotel;

    private String airportName;

    private String carAddress;
}
