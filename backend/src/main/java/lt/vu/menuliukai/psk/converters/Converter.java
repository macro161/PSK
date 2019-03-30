package lt.vu.menuliukai.psk.converters;

import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

public class Converter {
    public static <TObject> TObject convert(CrudRepository<TObject, Long> dao, String name, Long id) {
        Optional<TObject> tobject = dao.findById(id);
        if (tobject.isPresent()) {
            return tobject.get();
        } else {
            throwException(name, id);
            // never gonna happen
            return null;
        }
    }

    public static void throwException(String name, Long id) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format(name, " with id %d not found", id));
    }
}