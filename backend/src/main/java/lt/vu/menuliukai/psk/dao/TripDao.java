package lt.vu.menuliukai.psk.dao;

import lt.vu.menuliukai.psk.entities.Trip;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TripDao extends CrudRepository<Trip, Long> {
}
