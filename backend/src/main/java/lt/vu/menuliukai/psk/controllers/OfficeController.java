package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.dao.OfficeApartmentDao;
import lt.vu.menuliukai.psk.dao.OfficeDao;
import lt.vu.menuliukai.psk.dto.OfficeDto;
import lt.vu.menuliukai.psk.entities.Office;
import lt.vu.menuliukai.psk.util.StreamUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.stream.Stream;
import java.util.stream.StreamSupport;


@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/office")
public class OfficeController {
    @Autowired
    private OfficeDao officeDao;

    @Autowired
    OfficeApartmentDao officeApartmentDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<OfficeDto> index() {
        return StreamUtils.asIterable(StreamUtils.asStream(officeDao.findAll()).map(this::convert).iterator());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public OfficeDto get(@PathVariable long id) {
        Office office = officeDao.findById(id);
        if (office == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("office with id %d not found", id));
        }
        return convert(office);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public OfficeDto add(@RequestBody OfficeDto office) {
        return convert(officeDao.save(convert(office)));
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable long id) {
        try {
            officeDao.deleteById(id);
        } catch (EmptyResultDataAccessException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("office with id %d not found", id));
        }
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Office edit(@RequestBody Office office, @PathVariable long id){
        Office ofc = officeDao.findById(id);
        if(ofc == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Office with id %d not found", id));
        }

        ofc.setAddress(office.getAddress());
        ofc.setCity(office.getCity());

        return officeDao.save(ofc);
    }

    private Office convert(OfficeDto officeDto) {
        Office office = new Office();
        office.setAddress(officeDto.getAddress());
        office.setCity(officeDto.getCity());
        office.setOfficeApartment(officeApartmentDao.findById(officeDto.getOfficeApartmentId()));
        return office;
    }

    private OfficeDto convert(Office office) {
        OfficeDto officeDto = new OfficeDto();
        officeDto.setAddress(office.getAddress());
        officeDto.setCity(office.getCity());
        officeDto.setOfficeApartmentId(office.getOfficeApartment().getId());
        return officeDto;
    }
}
