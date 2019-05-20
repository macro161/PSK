package lt.vu.menuliukai.psk.service;

import lt.vu.menuliukai.psk.dao.EmployeeTripDao;
import lt.vu.menuliukai.psk.dao.FlightDao;
import lt.vu.menuliukai.psk.dao.StatisticsDao;
import lt.vu.menuliukai.psk.dao.TripDao;
import lt.vu.menuliukai.psk.entities.EmployeeTrip;
import lt.vu.menuliukai.psk.entities.Flight;
import lt.vu.menuliukai.psk.entities.Statistics;
import lt.vu.menuliukai.psk.entities.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@Component
@Service
@RequestScope
public class JPAStatisticsService implements StatisticsDao {

    private Statistics statistics = new Statistics();

    @Autowired
    private TripDao tripDao;

    @Autowired
    private FlightDao flightDao;

    @Autowired
    private EmployeeTripDao employeeTripDao;

    long argument = 0;

    @Override
    public Statistics calculateStatistics() {

        List<Trip> trips = new ArrayList<>();
        List<EmployeeTrip> employeeTrips = new ArrayList<>();
        List<String> cities = new ArrayList<>();
        List<Flight> flights = new ArrayList<>();
        Trip trip = new Trip();
        Trip trip2 = new Trip();
        Flight flight = new Flight();
        Flight flight2 = new Flight();
        long argument2 = Integer.MAX_VALUE;
        long temp;
        long temp2;
        boolean toBreak = false;
        boolean toBreak2 = false;

        tripDao.findAll().forEach(t -> trips.add(t));
        employeeTripDao.findAll().forEach(t -> employeeTrips.add(t));
        trips.forEach(t -> cities.add(t.getToOffice().getCity()));
        flightDao.findAll().forEach(f -> flights.add(f));



        try {
            statistics.setMostCommonTripDestination(mostCommon(cities));


            for(Trip t : trips){
                temp = temp2 = t.getReturningDate().getTime() - t.getLeavingDate().getTime();
                if (temp > argument){
                    argument = temp;
                    trip = t;
                }
                if (temp2 < argument2){
                    argument2 = temp2;
                    trip2 = t;
                }
            }
            statistics.setLongestTripOrigin(trip.getFromOffice().getCity());
            statistics.setLongestTripDestination(trip.getToOffice().getCity());
            statistics.setShortestTripOrigin(trip2.getFromOffice().getCity());
            statistics.setShortestTripDestination(trip2.getToOffice().getCity());


            argument = Integer.MIN_VALUE;
            argument2 = Integer.MAX_VALUE;

            for(Flight f : flights){
                temp = temp2 = f.getPrice();
                if (temp > argument){
                    argument = temp;
                    flight = f;
                }
                if (temp2 < argument2){
                    argument2 = temp2;
                    flight2 = f;
                }
            }

            for(EmployeeTrip et : employeeTrips){
                if(et.getFlight().getId() == flight.getId()){
                    statistics.setMostExpensiveTripOrigin(et.getTrip().getFromOffice().getCity());
                    statistics.setMostExpensiveTripDestination(et.getTrip().getToOffice().getCity());
                    toBreak = true;
                }
                if(et.getFlight().getId() == flight2.getId()){
                    statistics.setCheapestTripOrigin(et.getTrip().getFromOffice().getCity());
                    statistics.setCheapestTripDestination(et.getTrip().getToOffice().getCity());
                    toBreak2 = true;
                }
                if (toBreak == true && toBreak2 == true){
                    break;
                }
            }

            return statistics;
        } catch (NullPointerException npe) {
            return statistics;
        }

    }

    @Override
    public long getEmployeeTripQuantity(String fullName) {
        argument = 0;
        for (EmployeeTrip et : employeeTripDao.findAll()) {
            if (et.getEmployee().getFullName().equals(fullName.replace('_', ' '))) {
                argument++;
            }
        }

        return argument;
    }

    @Override
    public long getPeriodTripQuantity(String leavingDate, String returningDate) {
        argument = 0;
        try{
            for(Trip t : tripDao.findAll()){
                if(t.getLeavingDate().compareTo(new SimpleDateFormat("yyyy-MM-dd").parse(leavingDate)) > 0 &&
                        t.getReturningDate().compareTo(new SimpleDateFormat("yyyy-MM-dd").parse(returningDate)) < 0){
                    argument++;
                }
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return argument;
    }

    public static <T> T mostCommon(List<T> list) {
        Map<T, Integer> map = new HashMap<>();

        for (T t : list) {
            Integer val = map.get(t);
            map.put(t, val == null ? 1 : val + 1);
        }

        Map.Entry<T, Integer> max = null;

        for (Map.Entry<T, Integer> e : map.entrySet()) {
            if (max == null || e.getValue() > max.getValue())
                max = e;
        }

        return max.getKey();
    }
}
