package lt.vu.menuliukai.psk.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
    private ApartmentRoom apartmentRoom;

    @ManyToOne
    @JoinColumn
    private TripChecklist tripChecklist;
}
