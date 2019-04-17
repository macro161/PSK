package lt.vu.menuliukai.psk.converters;

import com.fasterxml.jackson.databind.util.StdConverter;
import lt.vu.menuliukai.psk.dao.ApartmentsDao;
import lt.vu.menuliukai.psk.entities.Apartments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ApartmentsConverter extends StdConverter<Long, Apartments> {
    @Autowired
    ApartmentsDao apartmentsDao;

    @Override
    public Apartments convert(Long id) {
        return Converter.convert(apartmentsDao, "apartments", id);
    }
}
