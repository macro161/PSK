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

    public static EmployeeTripCsvDto from(EmployeeTrip et) {
        return new EmployeeTripCsvDto(
            et.getId().getEmployeeId(),
            et.getId().getTripId(),
            et.getEmployee().getFullName(),
            et.getTrip().getLeavingDate().toString(),
            et.getTrip().getReturningDate().toString(),
            et.getTrip().getFromOffice().getCity(),
            et.getTrip().getToOffice().getCity(),
            et.getTripChecklist().getPlainTickets(),
            et.getTripChecklist().getCar(),
            et.getTripChecklist().getApartments(),
            et.getApproved());
    }
}
