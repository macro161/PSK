package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.entities.Event;
import lt.vu.menuliukai.psk.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/events")
public class EventsController {

    @Autowired
    EventService eventService;

    @RequestMapping(value = "/{email}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Event> getByEmail(@PathVariable String email) {
        return eventService.getEvents(email);
    }
}
