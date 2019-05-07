package lt.vu.menuliukai.psk.entities;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Statistics {

    long employeeTripQuantity;

    long periodTripQuantity;

    String mostCommonTripDestination;

    String mostExpensiveTripOrigin;
    String mostExpensiveTripDestination;

    String cheapestTripOrigin;
    String cheapestTripDestination;

    String shortestTripOrigin;
    String shortestTripDestination;

    String longestTripOrigin;
    String longestTripDestination;
}
