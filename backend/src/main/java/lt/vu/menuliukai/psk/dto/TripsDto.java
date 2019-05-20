package lt.vu.menuliukai.psk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TripsDto {

    long tripId;

    long organiserId;

    Date leavingDate;

    Date returningDate;

    String leavingOffice;

    String destinationOffice;

    List<EmployeeTripDto> employeeTrips = new ArrayList<>();

}
