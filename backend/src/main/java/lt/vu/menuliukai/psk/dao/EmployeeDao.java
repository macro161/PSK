package lt.vu.menuliukai.psk.dao;

import lt.vu.menuliukai.psk.entities.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeDao extends CrudRepository<Employee, Long> {
    Employee findByEmail(String username);
}
