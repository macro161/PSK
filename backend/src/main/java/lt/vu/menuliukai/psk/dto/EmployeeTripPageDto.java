package lt.vu.menuliukai.psk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.vu.menuliukai.psk.entities.ApartmentRoom;
import lt.vu.menuliukai.psk.entities.EmployeeTripId;
import lt.vu.menuliukai.psk.entities.TripChecklist;
import org.springframework.lang.Nullable;

import java.util.Date;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class EmployeeTripPageDto {

    EmployeeTripId id;

    String fullName;

    Integer aptRoom;

    String leavingDate;

    String returningDate;

    String accommodation;

    String leavingOffice;

    String destinationOffice;

    TripChecklist tripChecklist;

    boolean approved;

}
