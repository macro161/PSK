package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.dao.ApartmentRoomDao;
import lt.vu.menuliukai.psk.dao.OfficeDao;
import lt.vu.menuliukai.psk.dto.OfficeDto;
import lt.vu.menuliukai.psk.entities.ApartmentRoom;
import lt.vu.menuliukai.psk.entities.Office;
import lt.vu.menuliukai.psk.util.StreamUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/office")
public class OfficeController {
    @Autowired
    private OfficeDao officeDao;

    @Autowired
    ApartmentRoomDao apartmentRoomDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<OfficeDto> index() {
        return StreamUtils.asIterable(StreamUtils.asStream(officeDao.findAll()).map(this::convert).iterator());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public OfficeDto get(@PathVariable long id) {
        return convert(findById(id));
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

    private Office findById(long id) {
        Office office = officeDao.findById(id);
        if (office == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Office with id %d not found", id));
        }
        return office;
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Office edit(@RequestBody OfficeDto officeDto, @PathVariable long id) {
        Office office = findById(id);

        office.setAddress(officeDto.getAddress());
        office.setCity(officeDto.getCity());

        return officeDao.save(office);
    }

    private Office convert(OfficeDto officeDto) {
        Office office = new Office();
        office.setAddress(officeDto.getAddress());
        office.setCity(officeDto.getCity());
        office.setApartmentRooms(
                officeDto.getApartmentRooms().stream().map(id -> apartmentRoomDao.findById(id).get())
                .collect(Collectors.toList()));
        return office;
    }

    private OfficeDto convert(Office office) {
        OfficeDto officeDto = new OfficeDto();
        officeDto.setAddress(office.getAddress());
        officeDto.setCity(office.getCity());
        officeDto.setApartmentRooms(
                office.getApartmentRooms().stream().map(ApartmentRoom::getId)
                .collect(Collectors.toList()));
        return officeDto;
    }
}
