package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.converters.Converter;
import lt.vu.menuliukai.psk.dao.EmployeeDao;
import lt.vu.menuliukai.psk.dao.EmployeeTripDao;
import lt.vu.menuliukai.psk.dao.TripDao;
import lt.vu.menuliukai.psk.dto.*;
import lt.vu.menuliukai.psk.entities.*;
import lt.vu.menuliukai.psk.service.EmployeeTripService;
import lt.vu.menuliukai.psk.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;
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

    @Autowired
    EventService eventService;

    @Autowired
    EmployeeTripService employeeTripService;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<EmployeeTrip> index() {
        return employeeTripService.findAll();
    }

    private <T> Stream<T> stream(Iterable<T> iterable) {
        return StreamSupport.stream(iterable.spliterator(), false);
    }

    private <TIn, TOut> List<TOut> convert(Iterable<TIn> iterable, Function<TIn, TOut> func) {
        return stream(iterable).map(func::apply)
                .collect(Collectors.toList());
    }

    @RequestMapping(value = "/getcsv", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EmployeeTripCsvDto> get() {
        return convert(employeeTripDao.findAll(), EmployeeTripCsvDto::from);
    }

    @RequestMapping(value = "/{employeeId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EmployeeTripPageDto> get(@PathVariable Long employeeId) {
        return convert(employeeTripDao.findByIdEmployeeId(employeeId), EmployeeTripPageDto::from);
    }

    @RequestMapping(value = "/{employeeId}/{tripId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public EmployeeTrip get(@PathVariable long employeeId, @PathVariable long tripId) {
        return employeeTripService.findById(new EmployeeTripId(employeeId, tripId));
    }

    @RequestMapping(value = "/group", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TripsDto> group(@RequestBody TripsGroupingDto tripsGroupingDto) {
        return employeeTripService.group(tripsGroupingDto);
    }

    @RequestMapping(value = "/employees/{employeeId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EmployeeTrip> getByEmployee(@PathVariable long employeeId) {
        return employeeTripDao.findByIdEmployeeId(employeeId);
    }

    @RequestMapping(value = "/approve/{employeeId}/{tripId}/{wantsAccommodation}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public EmployeeTrip update(@PathVariable long employeeId, @PathVariable long tripId, @PathVariable int wantsAccommodation) {
        EmployeeTripId eti = new EmployeeTripId(employeeId, tripId);
        return employeeTripService.update(eti, wantsAccommodation);
    }

    @RequestMapping(value = "/decline/{employeeId}/{tripId}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public EmployeeTrip decline(@PathVariable long employeeId, @PathVariable long tripId) {
        EmployeeTrip declinedTrip = employeeTripDao.findById(new EmployeeTripId(employeeId,tripId)).orElse(null);

        employeeTripDao.deleteById(declinedTrip.getId());

        return declinedTrip;
    }

    @RequestMapping(value = "/trip/{tripId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EmployeeTrip> getByTrip(@PathVariable long tripId) {
        return employeeTripDao.findByIdTripId(tripId);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public TripsDto add(@RequestBody EmployeeTrip employeeTrip) {

        employeeTrip.setId(new EmployeeTripId(employeeTrip.getEmployee().getId(), employeeTrip.getTrip().getId()));
        eventService.addEvent(employeeTrip.getEmployee().getEmail(), employeeTrip.getTrip().getLeavingDate(), employeeTrip.getTrip().getReturningDate(), "Trip");

        EmployeeTrip empTrip = employeeTripDao.save(employeeTrip);
        Trip trip = empTrip.getTrip();

        List<EmployeeTripDto> employeeTrips = employeeTripDao.findByIdTripId(trip.getId()).stream()
            .map(EmployeeTripDto::from).collect(Collectors.toList());

        return TripsDto.from(trip, employeeTrips);
    }

    @RequestMapping(value = "/delete/{employeeId}/{tripId}", method = RequestMethod.DELETE)
    public void delete(@PathVariable long employeeId, @PathVariable long tripId) {
        try {
            EmployeeTrip employeeTrip = employeeTripDao.findById(new EmployeeTripId(employeeId, tripId)).orElse(null);
            employeeTripDao.deleteById(new EmployeeTripId(employeeId, tripId));
            if (employeeTrip != null){
                eventService.deleteEvent(employeeTrip.getEmployee().getEmail(), employeeTrip.getTrip().getLeavingDate());
            }
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
    public List<TripsDto> getTrips() {
        return employeeTripService.getTrips();
    }
}
