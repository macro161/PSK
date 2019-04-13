package lt.vu.menuliukai.psk.dao;

import lt.vu.menuliukai.psk.entities.EmployeeTrip;
import lt.vu.menuliukai.psk.entities.EmployeeTripId;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeTripDao extends CrudRepository<EmployeeTrip, EmployeeTripId> {
}
