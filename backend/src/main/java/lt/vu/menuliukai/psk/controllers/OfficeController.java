package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.converters.LongToOfficeConverter;
import lt.vu.menuliukai.psk.dao.OfficeDao;
import lt.vu.menuliukai.psk.entities.Office;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/office")
public class OfficeController {
    @Autowired
    private OfficeDao officeDao;

    @Autowired
    private LongToOfficeConverter converter;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Office> index() {
        return officeDao.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Office get(@PathVariable long id) {
        return converter.convert(id);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Office add(@RequestBody Office office) {
        return officeDao.save(office);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable long id) {
        try {
            officeDao.deleteById(id);
        } catch (EmptyResultDataAccessException exception) {
            converter.throwException(id);
        }
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Office edit(@RequestBody Office office, @PathVariable long id){
        Office baseOffice = converter.convert(id);

        baseOffice.setAddress(office.getAddress());
        baseOffice.setCity(office.getCity());

        return officeDao.save(office);
    }
}
