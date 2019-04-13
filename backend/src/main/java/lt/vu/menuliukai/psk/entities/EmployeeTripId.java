package lt.vu.menuliukai.psk.entities;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter @Setter
@EqualsAndHashCode
@AllArgsConstructor
public class EmployeeTripId implements Serializable {

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "trip_id")
    private Long tripId;
}
