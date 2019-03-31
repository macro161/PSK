package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.converters.Converter;
import lt.vu.menuliukai.psk.dao.EmployeeDao;
import lt.vu.menuliukai.psk.entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/employee")
public class EmployeeController {
    private final String objectName = "employee";

    @Autowired
    private EmployeeDao employeeDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Employee> index() {
        return employeeDao.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Employee get(@PathVariable long id) {
        return Converter.convert(employeeDao, objectName, id);
    }
    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Employee add(@RequestBody Employee employee) {
        return employeeDao.save(employee);
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