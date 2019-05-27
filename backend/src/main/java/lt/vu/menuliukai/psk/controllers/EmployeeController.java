package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.PskApplication;
import lt.vu.menuliukai.psk.converters.Converter;
import lt.vu.menuliukai.psk.dao.EmployeeDao;
import lt.vu.menuliukai.psk.dao.OfficeDao;
import lt.vu.menuliukai.psk.entities.Employee;
import lt.vu.menuliukai.psk.entities.Office;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.function.Consumer;
import java.util.function.Supplier;


@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/employee")
public class EmployeeController {
    private final String objectName = "employee";

    @Autowired
    private EmployeeDao employeeDao;

    @Autowired
    private OfficeDao officeDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Employee> index() {
        return employeeDao.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Employee get(@PathVariable long id) {
        return Converter.convert(employeeDao, objectName, id);
    }

    private String encryptPassword(String password) {
        return passwordEncoder.encode(password);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Employee add(@RequestBody Employee employee) throws ResponseStatusException {
        String role = PskApplication.getUserRole();
        if (role == null || !role.equals("ADMIN")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "user needs to have ADMIN role to create users");
        }

        if (employee.getOffice() == null) {
            employee.setOffice(officeDao.save(new Office()));
        }

        if (employee.getRole() == null) {
            employee.setRole("USER");
        }

        if (employee.getPassword() != null) {
            employee.setPassword(encryptPassword(employee.getPassword()));
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password can not be empty");
        }

        return employeeDao.save(employee);
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
        try {
            employeeDao.deleteById(id);
        } catch (EmptyResultDataAccessException exception) {
            Converter.throwException(objectName, id);
        }
    }
}
