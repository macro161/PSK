package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.converters.Converter;
import lt.vu.menuliukai.psk.dao.ApartmentRoomDao;
import lt.vu.menuliukai.psk.entities.ApartmentRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/office/apartment")
public class ApartmentRoomController {
    private final String objectName = "apartment room";

    @Autowired
    private ApartmentRoomDao apartmentRoomDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<ApartmentRoom> index() {
        return apartmentRoomDao.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApartmentRoom get(@PathVariable long id) {
        return Converter.convert(apartmentRoomDao, objectName, id);
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
            Converter.throwException(objectName, id);
        }
    }
}
