package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.dao.ApartmentRoomDao;
import lt.vu.menuliukai.psk.entities.ApartmentRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/office/apartment/room")
public class ApartmentRoomController {
    @Autowired
    private ApartmentRoomDao apartmentRoomDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<ApartmentRoom> index() {
        return apartmentRoomDao.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApartmentRoom get(@PathVariable long id) {
        ApartmentRoom apartmentRoom = apartmentRoomDao.findById(id);
        if (apartmentRoom == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("apartment room with id %d not found", id));
        }
        return apartmentRoom;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApartmentRoom add(@RequestBody ApartmentRoom apartmentRoom) {
        return apartmentRoomDao.save(apartmentRoom);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable long id) {
        try {
            apartmentRoomDao.deleteById(id);
        } catch (EmptyResultDataAccessException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("apartment room with id %d not found", id));
        }
    }
}
