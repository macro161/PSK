package lt.vu.menuliukai.psk.service;

import lt.vu.menuliukai.psk.dto.TripsDto;
import lt.vu.menuliukai.psk.dto.TripsGroupingDto;
import lt.vu.menuliukai.psk.entities.EmployeeTrip;
import lt.vu.menuliukai.psk.entities.EmployeeTripId;

import java.util.List;

public interface EmployeeTripService {
    Iterable<EmployeeTrip> findAll();
    EmployeeTrip findById(EmployeeTripId employeeTripId);
    List<TripsDto> group(TripsGroupingDto tripsGroupingDto);
    List<TripsDto> getTrips();
    EmployeeTrip update(EmployeeTripId eti, int wantsAccommodation);
}
