package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.converters.Converter;
import lt.vu.menuliukai.psk.dao.EmployeeTripDao;
import lt.vu.menuliukai.psk.entities.Employee;
import lt.vu.menuliukai.psk.entities.EmployeeTrip;
import lt.vu.menuliukai.psk.entities.EmployeeTripId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/employeetrip")
public class EmployeeTripController {
    private final String objectName = "employee trip";

    @Autowired
    EmployeeTripDao employeeTripDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<EmployeeTrip> index() {
        return employeeTripDao.findAll();
    }

    @RequestMapping(value = "/{employeeId}/{tripId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public EmployeeTrip get(@PathVariable long employeeId, @PathVariable long tripId) {
        return employeeTripDao.findById(new EmployeeTripId(employeeId, tripId)).orElse(null);
    }

    @RequestMapping(value = "/employees/{employeeId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EmployeeTrip> getByEmployee(@PathVariable long employeeId) {
        return employeeTripDao.findByIdEmployeeId(employeeId);
    }

    @RequestMapping(value = "/trip/{tripId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EmployeeTrip> getByTrip(@PathVariable long tripId) {
        return employeeTripDao.findByIdTripId(tripId);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public EmployeeTrip add(@RequestBody EmployeeTrip employeeTrip) {
        employeeTrip.setId(new EmployeeTripId(employeeTrip.getEmployee().getId(), employeeTrip.getTrip().getId()));
        return employeeTripDao.save(employeeTrip);
    }

    @RequestMapping(value = "/delete/{employeeId}/{tripId}", method = RequestMethod.DELETE)
    public void delete(@PathVariable long employeeId, @PathVariable long tripId) {
        try {
            employeeTripDao.deleteById(new EmployeeTripId(employeeId, tripId));
        } catch (EmptyResultDataAccessException exception) {
            Converter.throwException(objectName, employeeId);
        }
    }
}
