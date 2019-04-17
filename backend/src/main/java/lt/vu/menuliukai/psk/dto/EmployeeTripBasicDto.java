package lt.vu.menuliukai.psk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.vu.menuliukai.psk.entities.EmployeeTripId;

import java.util.Date;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class EmployeeTripBasicDto {

    EmployeeTripId id;

    String fullName;

    Date leavingDate;

    Date returningDate;

    String leavingOffice;

    String destinationOffice;




}
