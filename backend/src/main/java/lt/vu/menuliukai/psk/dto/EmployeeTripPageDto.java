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

    CarRent carRent;

    Flight flight;

    TripChecklist tripChecklist;

    boolean approved;

}
