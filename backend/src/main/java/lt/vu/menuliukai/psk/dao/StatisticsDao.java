package lt.vu.menuliukai.psk.dao;

import lt.vu.menuliukai.psk.entities.Statistics;
import lt.vu.menuliukai.psk.mappers.StatisticsMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Component
@RequestScope
public class StatisticsDao implements StatisticsInterface {

    private final SqlSession sqlSession;

    private final StatisticsMapper statisticsMapper;

    private Statistics statistics = new Statistics();

    public StatisticsDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
        statisticsMapper = this.sqlSession.getMapper(StatisticsMapper.class);
    }

    public Statistics calculateStatistics() {

        statistics.setMostCommonTripDestination(statisticsMapper.selectMostCommonDestination());

        Statistics temp = statisticsMapper.selectCheapestTrip();
        statistics.setCheapestTripOrigin(temp.getCheapestTripOrigin());
        statistics.setCheapestTripDestination(temp.getCheapestTripDestination());

        temp = statisticsMapper.selectMostExpensiveTrip();
        statistics.setMostExpensiveTripDestination(temp.getMostExpensiveTripDestination());
        statistics.setMostExpensiveTripOrigin(temp.getMostExpensiveTripOrigin());

        temp = statisticsMapper.selectShortestTrip();
        statistics.setShortestTripOrigin(temp.getShortestTripOrigin());
        statistics.setShortestTripDestination(temp.getShortestTripDestination());

        temp = statisticsMapper.selectLongestTrip();
        statistics.setLongestTripDestination(temp.getLongestTripDestination());
        statistics.setLongestTripOrigin(temp.getLongestTripOrigin());

        return statistics;
    }

    public long getEmployeeTripQuantity(String fullName) {
        return statisticsMapper.selectEmployeeTripQuantity(fullName.replace('_', ' '));
    }

    public long getPeriodTripQuantity(String leavingDate, String returningDate) {
        return statisticsMapper.selectPeriodTripQuantity(leavingDate, returningDate);
    }
}
