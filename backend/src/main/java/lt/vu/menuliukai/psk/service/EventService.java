package lt.vu.menuliukai.psk.service;

import lt.vu.menuliukai.psk.entities.Event;

import java.util.Date;
import java.util.List;

public interface EventService {

    boolean addEvent(String email, Event event);

    List<Event> getEvents(String email);

    List<Event> getEvents(String email, Date startDate, Date endDate);

    boolean isFree(String email, Date startDate, Date endDate);

    void deleteEvent(String email, Event event);

}
