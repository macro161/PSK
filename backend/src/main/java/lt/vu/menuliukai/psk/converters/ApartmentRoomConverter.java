package lt.vu.menuliukai.psk.converters;

import com.fasterxml.jackson.databind.util.StdConverter;
import lt.vu.menuliukai.psk.dao.ApartmentRoomDao;
import lt.vu.menuliukai.psk.entities.ApartmentRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class ApartmentRoomConverter extends StdConverter<Long, ApartmentRoom> {
    @Autowired
    ApartmentRoomDao apartmentRoomDao;

    public void throwException(long id) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("apartment room with id %d not found", id));
    }

    public void checkIfNull(ApartmentRoom apartmentRoom, long id) {
        if (apartmentRoom == null) {
            throwException(id);
        }
    }

    @Override
    public ApartmentRoom convert(Long id) {
        ApartmentRoom apartmentRoom = apartmentRoomDao.findById((long)id);
        checkIfNull(apartmentRoom, id);
        return apartmentRoom;
    }
}