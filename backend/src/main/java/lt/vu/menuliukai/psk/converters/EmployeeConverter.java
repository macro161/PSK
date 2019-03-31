package lt.vu.menuliukai.psk.converters;

import com.fasterxml.jackson.databind.util.StdConverter;
import lt.vu.menuliukai.psk.dao.EmployeeDao;
import lt.vu.menuliukai.psk.entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EmployeeConverter extends StdConverter<Long, Employee> {
    @Autowired
    EmployeeDao employeeDao;

    @Override
    public Employee convert(Long id) {
        return Converter.convert(employeeDao, "employee", id);
    }
}
