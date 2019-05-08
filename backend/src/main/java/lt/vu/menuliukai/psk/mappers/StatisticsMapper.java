package lt.vu.menuliukai.psk.mappers;

import lt.vu.menuliukai.psk.entities.Statistics;
import org.apache.ibatis.annotations.Param;
import org.mybatis.cdi.Mapper;

@Mapper
public interface StatisticsMapper {

    String selectMostCommonDestination();
    String selectShortestTrip();
    String selectLongestTrip();
    String selectMostExpensiveTrip();
    String selectCheapestTrip();
    Integer selectEmployeeTripQuantity(String fullName);
    Integer selectPeriodTripQuantity(@Param("leavingDate") String param, @Param("returningDate") String param2);
}
