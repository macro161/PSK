package lt.vu.menuliukai.psk.dao;

import lt.vu.menuliukai.psk.entities.Event;
import org.springframework.data.repository.CrudRepository;

public interface EventDao extends CrudRepository<Event, Long> {
}
