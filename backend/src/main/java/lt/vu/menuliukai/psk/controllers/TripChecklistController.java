package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.converters.Converter;
import lt.vu.menuliukai.psk.dao.TripChecklistDao;
import lt.vu.menuliukai.psk.entities.TripChecklist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/trip/checklist")
public class TripChecklistController {
    private final String objectName = "checklist";

    @Autowired
    private TripChecklistDao tripChecklistDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<TripChecklist> index() {
        return tripChecklistDao.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public TripChecklist get(@PathVariable long id) {
        return Converter.convert(tripChecklistDao, objectName, id);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public TripChecklist add(@RequestBody TripChecklist tripChecklist) {
        return tripChecklistDao.save(tripChecklist);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public TripChecklist update(@RequestBody TripChecklist tripChecklist) {
        if(tripChecklist.getApartments()==1)
            tripChecklist.setApartments(2);
        return tripChecklistDao.save(tripChecklist);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable long id) {
        try {
            tripChecklistDao.deleteById(id);
        } catch (EmptyResultDataAccessException exception) {
            Converter.throwException(objectName, id);
        }
    }
}
