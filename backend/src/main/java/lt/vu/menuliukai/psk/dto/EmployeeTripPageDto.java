package lt.vu.menuliukai.psk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.vu.menuliukai.psk.entities.*;
import org.springframework.lang.Nullable;

import java.util.Date;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class EmployeeTripPageDto {

    EmployeeTripId id;

    String fullName;

    ApartmentRoom aptRoom;

    String leavingDate;

    String returningDate;

    String accommodation;

    String leavingOffice;

    String destinationOffice;

    String destinationOfficeAddress;

    CarRent carRent;

    Flight flight;

    TripChecklist tripChecklist;

    boolean approved;

    public static EmployeeTripPageDto from(EmployeeTrip et) {
        return new EmployeeTripPageDto(
            et.getId(),
            et.getEmployee().getFullName(),
            et.getApartmentRoom(),
            et.getTrip().getLeavingDate().toString(),
            et.getTrip().getReturningDate().toString(),
            et.getTrip().getToOffice().getAptAddress(),
            et.getTrip().getFromOffice().getCity(),
            et.getTrip().getToOffice().getCity(),
            et.getTrip().getToOffice().getAddress(),
            et.getCarRent(),
            et.getFlight(),
            et.getTripChecklist(),
            et.getApproved());
    }
}
