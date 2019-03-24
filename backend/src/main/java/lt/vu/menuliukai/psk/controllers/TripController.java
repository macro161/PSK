package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.dao.TripDao;
import lt.vu.menuliukai.psk.entities.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/trip")
public class TripController {
    @Autowired
    private TripDao tripDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Trip> index() {
        return tripDao.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Trip get(@PathVariable long id) {
        Trip trip = tripDao.findById(id);
        if (trip == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("trip with id %d not found", id));
        }
        return trip;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Trip add(@RequestBody Trip trip) {
        return tripDao.save(trip);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable long id) {
        try {
            tripDao.deleteById(id);
        } catch (EmptyResultDataAccessException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("trip with id %d not found", id));
        }
    }
}
