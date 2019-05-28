package lt.vu.menuliukai.psk.service;

import lt.vu.menuliukai.psk.dao.EmployeeDao;
import lt.vu.menuliukai.psk.dao.EmployeeTripDao;
import lt.vu.menuliukai.psk.dao.TripDao;
import lt.vu.menuliukai.psk.dto.EmployeeTripDto;
import lt.vu.menuliukai.psk.dto.TripsDto;
import lt.vu.menuliukai.psk.dto.TripsGroupingDto;
import lt.vu.menuliukai.psk.entities.ApartmentRoom;
import lt.vu.menuliukai.psk.entities.EmployeeTrip;
import lt.vu.menuliukai.psk.entities.EmployeeTripId;
import lt.vu.menuliukai.psk.entities.Trip;
import org.apache.commons.lang.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Service
public class EmployeeTripServiceImpl implements EmployeeTripService {
    @Autowired
    EmployeeTripDao employeeTripDao;

    @Autowired
    TripDao tripDao;

    @Autowired
    EmployeeDao employeeDao;

    @Autowired
    EventService eventService;

    private <T> Stream<T> stream(Iterable<T> iterable) {
        return StreamSupport.stream(iterable.spliterator(), false);
    }

    private <TIn, TOut> List<TOut> convert(Iterable<TIn> iterable, Function<TIn, TOut> func) {
        return stream(iterable).map(func::apply)
                .collect(Collectors.toList());
    }

    private <TIn, TOut> List<TOut> convert(List<TIn> list, Function<TIn, TOut> func) {
        return list.stream().map(func)
                .collect(Collectors.toList());
    }

    public Iterable<EmployeeTrip> findAll() {
        return employeeTripDao.findAll();
    }

    public EmployeeTrip findById(EmployeeTripId employeeTripId) {
        return employeeTripDao.findById(employeeTripId).orElse(null);
    }

    public List<TripsDto> group(TripsGroupingDto tripsGroupingDto) {
        Trip t = tripDao.findById(tripsGroupingDto.getTripsToGroup().get(0)).orElse(null);
        if (t != null) {
            Trip trip = new Trip();
            trip.setLeavingDate(tripsGroupingDto.getDateFrom());
            trip.setLeavingDate(DateUtils.addHours(tripsGroupingDto.getDateFrom(), 3));
            trip.setReturningDate(DateUtils.addHours(tripsGroupingDto.getDateTo(), 3));
            trip.setFromOffice(t.getFromOffice());
            trip.setToOffice(t.getToOffice());
            trip.setOrganiser(tripsGroupingDto.getOrganiser());
            tripDao.save(trip);
            List<EmployeeTrip> tripsToGroup = new ArrayList<>();
            for (Long id : tripsGroupingDto.getTripsToGroup()) {
                tripsToGroup.addAll(employeeTripDao.findByIdTripId(id));
            }
            for (EmployeeTrip empTrip : tripsToGroup) {
                EmployeeTrip et = new EmployeeTrip(empTrip.getEmployee(), trip, empTrip.getTripChecklist(), empTrip.getApartmentRoom(), empTrip.getHotel(), empTrip.getFlight(), empTrip.getCarRent(), false);
                eventService.addEvent(et.getEmployee().getEmail(), et.getTrip().getLeavingDate(), et.getTrip().getReturningDate(), "Trip");
                eventService.deleteEvent(empTrip.getEmployee().getEmail(), empTrip.getTrip().getLeavingDate());
                employeeTripDao.save(et);
            }
            for (Long id: tripsGroupingDto.getTripsToGroup()){
                tripDao.deleteById(id);
            }
        }
        else {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "One of trip to group doesnt exist");
        }
        return getTrips();

    }

    public List<TripsDto> getTrips() {
        return convert(tripDao.findAll(), trip -> {
            List<EmployeeTripDto> eployeeTrips = convert(employeeTripDao.findByIdTripId(trip.getId()),
                    EmployeeTripDto::from);
            return TripsDto.from(trip, eployeeTrips);
        });
    }

    public EmployeeTrip update(EmployeeTripId eti, int wantsAccommodation) {
        EmployeeTrip approvedTrip = employeeTripDao.findById(eti).orElse(null);
        approvedTrip.setApproved(true);

        ApartmentRoom availableRoom = null;

        if (wantsAccommodation == 1)
            for (ApartmentRoom room:approvedTrip.getTrip().getToOffice().getApartmentRooms()) {
                Set<EmployeeTrip> trips = room.getEmployeeTrips();
                int tripCount = trips.size();
                int count = 0;
                for (EmployeeTrip trip: trips) {
                    if(trip.getTrip().getLeavingDate().compareTo(approvedTrip.getTrip().getReturningDate()) > 0
                            || trip.getTrip().getReturningDate().compareTo(approvedTrip.getTrip().getLeavingDate()) < 0){
                        count++;
                    }
                }
                if (count == tripCount)
                    availableRoom = room;
            }

        approvedTrip.setApartmentRoom(availableRoom);
        approvedTrip.getTripChecklist().setApartments(2);

        return employeeTripDao.save(approvedTrip);

    }

}
