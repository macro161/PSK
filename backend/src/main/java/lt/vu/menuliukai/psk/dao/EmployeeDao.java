package lt.vu.menuliukai.psk.dao;

import lt.vu.menuliukai.psk.entities.Employee;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EmployeeDao extends CrudRepository<Employee, Long> {
    Employee findByUsername(String username);
}
