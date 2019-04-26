package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.converters.Converter;
import lt.vu.menuliukai.psk.dao.OfficeDao;
import lt.vu.menuliukai.psk.dao.ApartmentsDao;
import lt.vu.menuliukai.psk.entities.ApartmentRoom;
import lt.vu.menuliukai.psk.entities.Office;
import lt.vu.menuliukai.psk.entities.Apartments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;
import java.util.function.Consumer;
import java.util.function.Supplier;


@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/office")
public class OfficeController {
    private final String objectName = "office";

    @Autowired
    private OfficeDao officeDao;

    @Autowired
    private ApartmentsDao apartmentsDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Office> index() {
        return officeDao.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Office get(@PathVariable long id) {
        return Converter.convert(officeDao, objectName, id);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Office add(@RequestParam("city") String city,@RequestParam("address") String address, @RequestParam("accommodation") String accommodation, @RequestParam("rooms") int rooms) {

        Office office = new Office();
        Apartments apartment = new Apartments();
        apartment.setAddress(accommodation);
        Set<ApartmentRoom> apartmentRooms = new HashSet<>();;
        for(int i=0;i<rooms;i++){
            ApartmentRoom aptRoom = new ApartmentRoom();
            aptRoom.setRoomNo(i);
            apartmentRooms.add(aptRoom);
        }
        apartment.setApartmentRooms(apartmentRooms);
        office.setCity(city);
        office.setAddress(address);
        office.setApartments(apartment);

        return officeDao.save(office);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable long id) {
        try {
            officeDao.deleteById(id);
        } catch (EmptyResultDataAccessException exception) {
            Converter.throwException(objectName, id);
        }
    }

    private <T> void change(Supplier<T> getter, Consumer<T> setter) {
        try {
            T value = getter.get();
            if (value != null) {
                setter.accept(value);
            }
        } catch (Exception ignored) { }
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Office edit(@RequestBody Office office , @PathVariable long id) {
        Office baseOffice = Converter.convert(officeDao, objectName, id);

        change(office::getAddress, baseOffice::setAddress);
        change(office::getCity, baseOffice::setCity);

        return officeDao.save(baseOffice);
    }
}
