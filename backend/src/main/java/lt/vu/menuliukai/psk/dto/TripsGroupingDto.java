package lt.vu.menuliukai.psk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lt.vu.menuliukai.psk.entities.Trip;

import java.util.Date;
import java.util.List;

@Getter @Setter
public class TripsGroupingDto {

    @JsonProperty("trips_to_group")
    List<Long> tripsToGroup;

    Date dateFrom;

    Date dateTo;
}
