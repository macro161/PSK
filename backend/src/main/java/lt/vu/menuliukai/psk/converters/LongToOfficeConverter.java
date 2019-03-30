package lt.vu.menuliukai.psk.converters;

import com.fasterxml.jackson.databind.util.StdConverter;
import lt.vu.menuliukai.psk.dao.OfficeDao;
import lt.vu.menuliukai.psk.entities.Office;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LongToOfficeConverter extends StdConverter<Long, Office> {
    @Autowired
    OfficeDao officeDao;

    @Override
    public Office convert(Long id) {
        return Converter.convert(officeDao, "apartment room", id);
    }

}
