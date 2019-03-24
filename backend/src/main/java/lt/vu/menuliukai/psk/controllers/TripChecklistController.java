package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.dao.TripChecklistDao;
import lt.vu.menuliukai.psk.entities.TripChecklist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/trip/checklist")
public class TripChecklistController {
    @Autowired
    private TripChecklistDao tripChecklistDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<TripChecklist> index() {
        return tripChecklistDao.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public TripChecklist get(@PathVariable long id) {
        TripChecklist tripChecklist = tripChecklistDao.findById(id);
        if (tripChecklist == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("trip checklist with id %d not found", id));
        }
        return tripChecklist;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public TripChecklist add(@RequestBody TripChecklist tripChecklist) {
        return tripChecklistDao.save(tripChecklist);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable long id) {
        try {
            tripChecklistDao.deleteById(id);
        } catch (EmptyResultDataAccessException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("trip checklist with id %d not found", id));
        }
    }
}
