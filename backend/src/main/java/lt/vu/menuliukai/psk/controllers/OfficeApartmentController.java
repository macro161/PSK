package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.dao.OfficeApartmentDao;
import lt.vu.menuliukai.psk.entities.OfficeApartment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/office/apartment")
public class OfficeApartmentController {
    @Autowired
    private OfficeApartmentDao officeApartmentDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<OfficeApartment> index() {
        return officeApartmentDao.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public OfficeApartment get(@PathVariable long id) {
        OfficeApartment officeApartment = officeApartmentDao.findById(id);
        if (officeApartment == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("office apartment with id %d not found", id));
        }
        return officeApartment;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public OfficeApartment add(@RequestBody OfficeApartment officeApartment) {
        return officeApartmentDao.save(officeApartment);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable long id) {
        try {
            officeApartmentDao.deleteById(id);
        } catch (EmptyResultDataAccessException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("office apartment with id %d not found", id));
        }
    }
}
