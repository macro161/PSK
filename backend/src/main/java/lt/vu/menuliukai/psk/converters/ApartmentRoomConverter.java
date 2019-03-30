package lt.vu.menuliukai.psk.converters;

import com.fasterxml.jackson.databind.util.StdConverter;
import lt.vu.menuliukai.psk.dao.ApartmentRoomDao;
import lt.vu.menuliukai.psk.entities.ApartmentRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ApartmentRoomConverter extends StdConverter<Long, ApartmentRoom> {
    @Autowired
    ApartmentRoomDao apartmentRoomDao;

    @Override
    public ApartmentRoom convert(Long id) {
        return Converter.convert(apartmentRoomDao, "apartment room", id);
    }
}