package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.converters.Converter;
import lt.vu.menuliukai.psk.dao.EmployeeTripDao;
import lt.vu.menuliukai.psk.dao.TripDao;
import lt.vu.menuliukai.psk.entities.Employee;
import lt.vu.menuliukai.psk.entities.EmployeeTrip;
import lt.vu.menuliukai.psk.entities.Trip;
import lt.vu.menuliukai.psk.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.MediaType;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.Date;


@RestController
@RequestMapping("/trip")
public class TripController {
    private final String objectName = "trip";

    @Autowired
    private TripDao tripDao;

    @Autowired
    EventService eventService;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Trip> index() {
        return tripDao.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Trip get(@PathVariable long id) {
        return Converter.convert(tripDao, objectName, id);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Trip add(@RequestBody Trip trip) {
        return tripDao.save(trip);
    }
    @RequestMapping(value="change/{tripId}/{startDate}/{endDate}/{version}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean change(@PathVariable Long tripId, @PathVariable Date startDate, @PathVariable Date endDate, Long version){
        Trip trip = tripDao.findById(tripId).orElse(null);
        if (trip != null){
            if (trip.getVersion() != version){
                throw new OptimisticLockingFailureException(Long.toString(trip.getId()));
            }
            for (EmployeeTrip empTrip: trip.getEmployeeTrips()) {
                empTrip.setApproved(Boolean.FALSE);
            }
            trip.setLeavingDate(startDate);
            trip.setReturningDate(endDate);
            tripDao.save(trip);
            return true;
        }
        return false;
    }
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable long id) {
        try {
            Trip trip = tripDao.findById(id).orElse(null);
            if (trip != null){
                for (EmployeeTrip empTrip: trip.getEmployeeTrips()) {
                      eventService.deleteEvent(empTrip.getEmployee().getEmail(), trip.getLeavingDate());
                }
            }
            tripDao.deleteById(id);
        } catch (EmptyResultDataAccessException exception) {
            Converter.throwException(objectName, id);
        }
    }
}
