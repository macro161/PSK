package lt.vu.menuliukai.psk.converters;

import com.fasterxml.jackson.databind.util.StdConverter;
import lt.vu.menuliukai.psk.dao.TripDao;
import lt.vu.menuliukai.psk.entities.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TripConverter extends StdConverter<Long, Trip> {
    @Autowired
    TripDao tripDao;

    @Override
    public Trip convert(Long id) {
        return Converter.convert(tripDao, "trip", id);
    }
}
