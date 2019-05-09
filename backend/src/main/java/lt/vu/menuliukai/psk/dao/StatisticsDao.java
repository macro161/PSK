package lt.vu.menuliukai.psk.dao;

import lt.vu.menuliukai.psk.entities.Statistics;
import lt.vu.menuliukai.psk.mappers.StatisticsMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Component;

import java.beans.FeatureDescriptor;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

@Component
public class StatisticsDao {
    private final SqlSession sqlSession;

    private final StatisticsMapper statisticsMapper;

    public StatisticsDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
        statisticsMapper = this.sqlSession.getMapper(StatisticsMapper.class);
    }

    private Statistics statistics = new Statistics();


    public Statistics calculateStatistics() {
        //statistics.setCheapestTripDestination(statisticsMapper.selectMostCommonDestination());
        Statistics temp;


        BeanUtils.copyProperties(temp = this.sqlSession.selectOne("selectCheapestTrip"), statistics, getNullPropertyNames(temp));
        BeanUtils.copyProperties(temp = this.sqlSession.selectOne("selectCheapestTrip"), statistics, getNullPropertyNames(temp));
        BeanUtils.copyProperties(temp = this.sqlSession.selectOne("selectMostCommonDestination"), statistics, getNullPropertyNames(temp));
        BeanUtils.copyProperties(temp = this.sqlSession.selectOne("selectShortestTrip"), statistics, getNullPropertyNames(temp));
        BeanUtils.copyProperties(temp = this.sqlSession.selectOne("selectLongestTrip"), statistics, getNullPropertyNames(temp));
        BeanUtils.copyProperties(temp = this.sqlSession.selectOne("selectMostExpensiveTrip"), statistics, getNullPropertyNames(temp));
        return statistics;
    }

    public Statistics getEmployeeTripQuantity(String fullName) {
        return this.sqlSession.selectOne("selectEmployeeTripQuantity", fullName.replace('_', ' '));
    }

    public Statistics getPeriodTripQuantity(String leavingDate, String returningDate) {
        Map<String, String> dates = new HashMap<>();
        dates.put("leavingDate", leavingDate);
        dates.put("returningDate", returningDate);
        return this.sqlSession.selectOne("selectPeriodTripQuantity", dates);
    }

    public static String[] getNullPropertyNames(Object source) {
        final BeanWrapper wrappedSource = new BeanWrapperImpl(source);
        return Stream.of(wrappedSource.getPropertyDescriptors())
                .map(FeatureDescriptor::getName)
                .filter(propertyName -> wrappedSource.getPropertyValue(propertyName) == null)
                .toArray(String[]::new);
    }
}
