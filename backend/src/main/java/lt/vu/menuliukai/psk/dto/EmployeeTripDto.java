package lt.vu.menuliukai.psk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.vu.menuliukai.psk.entities.TripChecklist;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeTripDto {

    long employeeId;

    String fullName;

    TripChecklist tripChecklist;

    boolean approved;
}
