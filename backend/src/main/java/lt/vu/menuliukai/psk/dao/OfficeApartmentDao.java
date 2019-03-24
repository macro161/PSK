package lt.vu.menuliukai.psk.dao;

import lt.vu.menuliukai.psk.entities.OfficeApartment;
import org.springframework.data.repository.CrudRepository;

public interface OfficeApartmentDao extends CrudRepository<OfficeApartment, Long> {
    OfficeApartment findById(long id);
}
