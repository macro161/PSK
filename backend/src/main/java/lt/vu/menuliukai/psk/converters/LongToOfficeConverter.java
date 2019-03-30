package lt.vu.menuliukai.psk.converters;

import com.fasterxml.jackson.databind.util.StdConverter;
import lt.vu.menuliukai.psk.dao.OfficeDao;
import lt.vu.menuliukai.psk.entities.Office;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class LongToOfficeConverter extends StdConverter<Long, Office> {
    @Autowired
    OfficeDao officeDao;

    public void checkIfNull(Office office, long id) {
        if (office == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Office with id %d not found", id));
        }
    }

    @Override
    public Office convert(Long id) {
        Office office = officeDao.findById((long)id);
        checkIfNull(office, id);
        return office;
    }
}
