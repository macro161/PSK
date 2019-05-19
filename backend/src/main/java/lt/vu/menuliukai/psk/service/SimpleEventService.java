package lt.vu.menuliukai.psk.service;

import lt.vu.menuliukai.psk.dao.EmployeeDao;
import lt.vu.menuliukai.psk.dao.EventDao;
import lt.vu.menuliukai.psk.entities.Employee;
import lt.vu.menuliukai.psk.entities.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SimpleEventService implements EventService {

    @Autowired
    EventDao eventDao;

    @Autowired
    EmployeeDao employeeDao;

    @Override
    public boolean addEvent(String email, Event event) {
        Employee emp = employeeDao.findByEmail(email);
        if (emp != null){
            event.setEmployee(emp);
            eventDao.save(event);
            return true;
        }
        else {
            return false;
        }
    }

    @Override
    public List<Event> getEvents(String email) {
        Employee emp = employeeDao.findByEmail(email);
        if (emp != null){
            return eventDao.findAllByEmployee(emp);
        }
        else{
            return null;
        }
    }

    @Override
    public List<Event> getEvents(String email, Date startDate, Date endDate) {
        Employee emp = employeeDao.findByEmail(email);
        if (emp != null){
            List<Event> events = eventDao.findAllByEmployee(emp);
            return events.stream().filter(event -> event.getStartDate().before(endDate) && event.getStartDate().after(startDate) ||
                    event.getEndDate().before(endDate) && event.getEndDate().after(startDate)).collect(Collectors.toList());
        }
        else{
            return null;
        }
    }

    @Override
    public boolean isFree(String email, Date startDate, Date endDate) {
        return getEvents(email, startDate, endDate) == null;
    }

    @Override
    public void deleteEvent(String email, Event event) {
        Employee emp = employeeDao.findByEmail(email);
        if (emp != null){
            event.setEmployee(emp);
            eventDao.delete(event);
        }
    }
}
