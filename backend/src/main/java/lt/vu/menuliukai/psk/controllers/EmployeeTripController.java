package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.converters.Converter;
import lt.vu.menuliukai.psk.dao.EmployeeDao;
import lt.vu.menuliukai.psk.dao.EmployeeTripDao;
import lt.vu.menuliukai.psk.dao.TripDao;
import lt.vu.menuliukai.psk.dto.EmployeeTripBasicDto;
import lt.vu.menuliukai.psk.dto.TripsGroupingDto;
import lt.vu.menuliukai.psk.entities.Employee;
import lt.vu.menuliukai.psk.entities.EmployeeTrip;
import lt.vu.menuliukai.psk.entities.EmployeeTripId;
import lt.vu.menuliukai.psk.entities.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/employeetrip")
public class EmployeeTripController {
    private final String objectName = "employee trip";

    @Autowired
    EmployeeTripDao employeeTripDao;

    @Autowired
    TripDao tripDao;

    @Autowired
    EmployeeDao employeeDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<EmployeeTrip> index() {
        return employeeTripDao.findAll();
    }

    @RequestMapping(value = "/{employeeId}/{tripId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public EmployeeTrip get(@PathVariable long employeeId, @PathVariable long tripId) {
        return employeeTripDao.findById(new EmployeeTripId(employeeId, tripId)).orElse(null);
    }

    @RequestMapping(value = "/group", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean group(@RequestBody TripsGroupingDto tripsGroupingDto) {
        Trip trip = tripDao.save(tripsGroupingDto.getTrip());
        List<EmployeeTrip> tripsToGroup = new ArrayList<>();
        for (Long id: tripsGroupingDto.getTripsToGroup()) {
            tripsToGroup.addAll(employeeTripDao.findByIdTripId(id));
        }
        for (EmployeeTrip empTrip : tripsToGroup) {
           EmployeeTrip et = new EmployeeTrip(empTrip.getEmployee(), trip, empTrip.getTripChecklist(), empTrip.getApartmentRoom(), empTrip.getHotel(), empTrip.getFlight(), empTrip.getCarRent());
           employeeTripDao.save(et);
           employeeTripDao.deleteById(empTrip.getId());
        }
        return true;
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
    @RequestMapping(value = "/basic", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EmployeeTripBasicDto> getBasic(){
        Iterable<EmployeeTrip> employeeTrips = employeeTripDao.findAll();
        return StreamSupport.stream(employeeTrips.spliterator(), false).map(et ->
                new EmployeeTripBasicDto(et.getId(), et.getEmployee().getFullName(), et.getTrip().getLeavingDate(), et.getTrip().getReturningDate(), et.getTrip().getFromOffice().getCity(), et.getTrip().getToOffice().getCity()))
                    .collect(Collectors.toList());
    }

}
