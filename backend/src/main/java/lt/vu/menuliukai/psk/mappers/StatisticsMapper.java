package lt.vu.menuliukai.psk.mappers;

import lt.vu.menuliukai.psk.entities.Statistics;
import org.apache.ibatis.annotations.Param;
import org.mybatis.cdi.Mapper;

@Mapper
public interface StatisticsMapper {

    String selectMostCommonDestination();
    Statistics selectShortestTrip();
    Statistics selectLongestTrip();
    Statistics selectMostExpensiveTrip();
    Statistics selectCheapestTrip();
    Long selectEmployeeTripQuantity(String fullName);
    Long selectPeriodTripQuantity(@Param("leavingDate") String leavingDate, @Param("returningDate") String returningDate);
}
