package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.entities.Employee;
import lt.vu.menuliukai.psk.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.function.Consumer;
import java.util.function.Supplier;


@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Employee> index() {
        return employeeService.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Employee get(@PathVariable long id) {
        return employeeService.findById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Employee add(@RequestBody Employee employee) throws ResponseStatusException {
        return employeeService.add(employee);
    }

    private <T> void change(Supplier<T> getter, Consumer<T> setter) {
        try {
            T value = getter.get();
            if (value != null) {
                setter.accept(value);
            }
        } catch (Exception ignored) { }
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Employee edit(@RequestBody Employee employee, @PathVariable long id) {
        Employee baseEmployee = Converter.convert(employeeDao, objectName, id);

        change(employee::getFullName, baseEmployee::setFullName);
        change(employee::getEmail, baseEmployee::setEmail);
        change(employee::getPassword, baseEmployee::setPassword);
        change(employee::getRole, baseEmployee::setRole);
        change(employee::getOffice, baseEmployee::setOffice);

        return employeeDao.save(baseEmployee);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable long id) {
        employeeService.delete(id);
    }
}
