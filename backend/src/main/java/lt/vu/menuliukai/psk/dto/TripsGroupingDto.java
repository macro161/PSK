package lt.vu.menuliukai.psk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
import lt.vu.menuliukai.psk.converters.EmployeeConverter;
import lt.vu.menuliukai.psk.converters.IdObjectToLongConverter;
import lt.vu.menuliukai.psk.entities.Employee;
import lt.vu.menuliukai.psk.entities.Trip;

import java.util.Date;
import java.util.List;

@Getter @Setter
public class TripsGroupingDto {

    @JsonProperty("trips_to_group")
    List<Long> tripsToGroup;

    Date dateFrom;

    @JsonSerialize(converter = IdObjectToLongConverter.class)
    @JsonDeserialize(converter = EmployeeConverter.class)
    Employee organiser;

    Date dateTo;
}
