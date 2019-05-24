package lt.vu.menuliukai.psk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.vu.menuliukai.psk.entities.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeTripCsvDto {

    Long employeeId;

    Long tripId;

    String fullName;

    String leavingDate;

    String returningDate;

    String leavingOffice;

    String destinationOffice;

    Integer planeTicketsStatus;

    Integer carStatus;

    Integer apartmentStatus;

    boolean approved;
}
