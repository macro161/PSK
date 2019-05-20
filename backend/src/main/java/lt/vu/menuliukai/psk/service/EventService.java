package lt.vu.menuliukai.psk.service;

import lt.vu.menuliukai.psk.entities.Event;

import java.util.Date;
import java.util.List;

public interface EventService {

    boolean addEvent(String email, Date startDate, Date endDate, String eventType);

    List<Event> getEvents(String email);

    List<Event> getEvents(String email, Date intervalStart, Date intervalEnd);

    boolean isFree(String email, Date intervalStart, Date intervalEnd);

    void deleteEvent(String email, Date startDate);

}
