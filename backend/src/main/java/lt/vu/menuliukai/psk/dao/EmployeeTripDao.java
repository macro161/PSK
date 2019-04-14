package lt.vu.menuliukai.psk.dao;

import lt.vu.menuliukai.psk.entities.EmployeeTrip;
import lt.vu.menuliukai.psk.entities.EmployeeTripId;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EmployeeTripDao extends CrudRepository<EmployeeTrip, EmployeeTripId> {
    List<EmployeeTrip> findByIdTripId(Long tripId);
    List<EmployeeTrip> findByIdEmployeeId(Long employeeId);

}
