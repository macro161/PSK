package lt.vu.menuliukai.psk.dao;

import lt.vu.menuliukai.psk.entities.Employee;
import lt.vu.menuliukai.psk.entities.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface EventDao extends CrudRepository<Event, Long> {
    List<Event> findAllByEmployee(Employee employee);
    List<Event> findByEmployeeAndStartDate(Employee employee, Date startDate);
}
