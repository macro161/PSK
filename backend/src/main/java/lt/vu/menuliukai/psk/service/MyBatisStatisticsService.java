package lt.vu.menuliukai.psk.service;

import lt.vu.menuliukai.psk.dao.StatisticsDao;
import lt.vu.menuliukai.psk.entities.Statistics;
import lt.vu.menuliukai.psk.mappers.StatisticsMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

@Service
@RequestScope
public class MyBatisStatisticsService implements StatisticsDao {

    private final SqlSession sqlSession;

    private final StatisticsMapper statisticsMapper;

    private Statistics statistics = new Statistics();

    public MyBatisStatisticsService(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
        statisticsMapper = this.sqlSession.getMapper(StatisticsMapper.class);
    }

    @Override
    public Statistics calculateStatistics() {

        statistics.setMostCommonTripDestination(statisticsMapper.selectMostCommonDestination());

        Statistics temp = statisticsMapper.selectCheapestTrip();
        if (temp != null){
            statistics.setCheapestTripOrigin(temp.getCheapestTripOrigin());
            statistics.setCheapestTripDestination(temp.getCheapestTripDestination());
        }

        temp = statisticsMapper.selectMostExpensiveTrip();
        if (temp != null) {
            statistics.setMostExpensiveTripDestination(temp.getMostExpensiveTripDestination());
            statistics.setMostExpensiveTripOrigin(temp.getMostExpensiveTripOrigin());
        }

        temp = statisticsMapper.selectShortestTrip();
        if (temp != null) {
            statistics.setShortestTripOrigin(temp.getShortestTripOrigin());
            statistics.setShortestTripDestination(temp.getShortestTripDestination());
        }

        temp = statisticsMapper.selectLongestTrip();
        if (temp != null) {
            statistics.setLongestTripDestination(temp.getLongestTripDestination());
            statistics.setLongestTripOrigin(temp.getLongestTripOrigin());
        }

        return statistics;
    }

    @Override
    public long getEmployeeTripQuantity(String fullName) {
        return statisticsMapper.selectEmployeeTripQuantity(fullName.replace('_', ' '));
    }

    @Override
    public long getPeriodTripQuantity(String leavingDate, String returningDate) {
        return statisticsMapper.selectPeriodTripQuantity(leavingDate, returningDate);
    }
}
