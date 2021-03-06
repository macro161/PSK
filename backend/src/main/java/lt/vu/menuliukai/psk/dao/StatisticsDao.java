package lt.vu.menuliukai.psk.dao;

import lt.vu.menuliukai.psk.entities.Statistics;

public interface StatisticsDao {

    Statistics calculateStatistics();

    long getEmployeeTripQuantity(String fullName);

    long getPeriodTripQuantity(String leavingDate, String returningDate);
}
