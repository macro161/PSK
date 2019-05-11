package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.converters.Converter;
import lt.vu.menuliukai.psk.dao.EmployeeDao;
import lt.vu.menuliukai.psk.dao.EmployeeTripDao;
import lt.vu.menuliukai.psk.dao.TripDao;
import lt.vu.menuliukai.psk.dto.EmployeeTripBasicDto;
import lt.vu.menuliukai.psk.dto.EmployeeTripDto;
import lt.vu.menuliukai.psk.dto.TripsDto;
import lt.vu.menuliukai.psk.dto.TripsGroupingDto;
import lt.vu.menuliukai.psk.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    @RequestMapping(value = "/{employeeId}/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public EmployeeTripBasicDto get(@PathVariable long employeeId) {
        Iterable<EmployeeTrip> et = employeeTripDao.findAll();
        return new EmployeeTripBasicDto(et.getId(), et.getEmployee().getFullName(), et.getTrip().getLeavingDate(), et.getTrip().getReturningDate(), et.getTrip().getFromOffice().getCity(), et.getTrip().getToOffice().getCity(), et.getTripChecklist(), et.getApproved()))
                .collect(Collectors.toList());
    }

    @RequestMapping(value = "/{employeeId}/{tripId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public EmployeeTrip get(@PathVariable long employeeId, @PathVariable long tripId) {
        return employeeTripDao.findById(new EmployeeTripId(employeeId, tripId)).orElse(null);
    }

    @RequestMapping(value = "/group", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean group(@RequestBody TripsGroupingDto tripsGroupingDto) {
        Trip t = tripDao.findById(tripsGroupingDto.getTripsToGroup().get(0)).orElse(null);
        if (t != null){
            Trip trip = new Trip();
            trip.setLeavingDate(tripsGroupingDto.getDateFrom());
            trip.setReturningDate(tripsGroupingDto.getDateTo());
            trip.setFromOffice(t.getFromOffice());
            trip.setToOffice(t.getToOffice());
            trip.setOrganiser(t.getOrganiser());
            tripDao.save(trip);
            List<EmployeeTrip> tripsToGroup = new ArrayList<>();
            for (Long id : tripsGroupingDto.getTripsToGroup()) {
                tripsToGroup.addAll(employeeTripDao.findByIdTripId(id));
            }
            for (EmployeeTrip empTrip : tripsToGroup) {
                EmployeeTrip et = new EmployeeTrip(empTrip.getEmployee(), trip, empTrip.getTripChecklist(), empTrip.getApartmentRoom(), empTrip.getHotel(), empTrip.getFlight(), empTrip.getCarRent(), false);
                employeeTripDao.save(et);
            }
            for (Long id: tripsGroupingDto.getTripsToGroup()){
                tripDao.deleteById(id);
            }
        }
        else{
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "One of trip to group doesnt exist");
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
        employeeTripDao.save(employeeTrip);
        return employeeTrip;
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
    public List<EmployeeTripBasicDto> getBasic() {
        Iterable<EmployeeTrip> employeeTrips = employeeTripDao.findAll();
        return StreamSupport.stream(employeeTrips.spliterator(), false).map(et ->
                new EmployeeTripBasicDto(et.getId(), et.getEmployee().getFullName(), et.getTrip().getLeavingDate(), et.getTrip().getReturningDate(), et.getTrip().getFromOffice().getCity(), et.getTrip().getToOffice().getCity(), et.getTripChecklist(), et.getApproved()))
                .collect(Collectors.toList());
    }

    @RequestMapping(value = "/add/{employeeId}/{tripId}/hotel", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addHotel(@PathVariable long employeeId, @PathVariable long tripId, @RequestBody Hotel hotel) {
        EmployeeTrip et = employeeTripDao.findById(new EmployeeTripId(employeeId, tripId)).orElse(null);
        if (et != null) {
            et.setApartmentRoom(null);
            et.getTripChecklist().setApartments(2);
            et.setHotel(hotel);
            employeeTripDao.save(et);
        } else {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Employee trip not found");
        }
    }

    @RequestMapping(value = "/add/{employeeId}/{tripId}/car", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addCarRent(@PathVariable long employeeId, @PathVariable long tripId, @RequestBody CarRent carRent) {
        EmployeeTrip et = employeeTripDao.findById(new EmployeeTripId(employeeId, tripId)).orElse(null);
        if (et != null) {
            et.getTripChecklist().setCar(2);
            et.setCarRent(carRent);
            employeeTripDao.save(et);
        } else {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Employee trip not found");
        }
    }
    @RequestMapping(value = "/add/{employeeId}/{tripId}/apartments", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addApartments(@PathVariable long employeeId, @PathVariable long tripId, @RequestBody ApartmentRoom apartmentRoom) {
        EmployeeTrip et = employeeTripDao.findById(new EmployeeTripId(employeeId, tripId)).orElse(null);
        if (et != null) {
            et.setHotel(null);
            et.getTripChecklist().setApartments(2);
            et.setApartmentRoom(apartmentRoom);
            employeeTripDao.save(et);
        } else {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Employee trip not found");
        }
    }

    @RequestMapping(value = "/add/{employeeId}/{tripId}/flight", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addFlight(@PathVariable long employeeId, @PathVariable long tripId, @RequestBody Flight flight) {
        EmployeeTrip et = employeeTripDao.findById(new EmployeeTripId(employeeId, tripId)).orElse(null);
        if (et != null) {
            et.setFlight(flight);
            et.getTripChecklist().setPlainTickets(2);
            employeeTripDao.save(et);
        } else {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Employee trip not found");
        }
    }

    @RequestMapping(value = "/trips", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TripsDto> getTrips(){
        Iterable<Trip> trips = tripDao.findAll();
        return StreamSupport.stream(trips.spliterator(), false).map(trip ->
                new TripsDto(trip.getId(), trip.getLeavingDate(), trip.getReturningDate(), trip.getFromOffice().getCity(), trip.getToOffice().getCity(),
                        employeeTripDao.findByIdTripId(trip.getId()).stream()
                                .map(et -> new EmployeeTripDto(et.getEmployee().getId(), et.getEmployee().getFullName(),
                                        et.getTripChecklist(), et.getApproved())).collect(Collectors.toList()))).collect(Collectors.toList());
    }
}
