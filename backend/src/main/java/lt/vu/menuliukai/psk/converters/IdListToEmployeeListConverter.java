package lt.vu.menuliukai.psk.converters;

import com.fasterxml.jackson.databind.util.StdConverter;
import lt.vu.menuliukai.psk.entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class IdListToEmployeeListConverter extends StdConverter<List<Long>, List<Employee>> {
    @Autowired
    EmployeeConverter converter;

    @Override
    public List<Employee> convert(List<Long> ids) {
        return ids.stream().map(id -> converter.convert(id)).collect(Collectors.toList());
    }
}