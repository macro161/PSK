package lt.vu.menuliukai.psk.dao;

import lt.vu.menuliukai.psk.entities.Flight;
import org.springframework.data.repository.CrudRepository;

public interface FlightDao extends CrudRepository<Flight, Long> {
}
