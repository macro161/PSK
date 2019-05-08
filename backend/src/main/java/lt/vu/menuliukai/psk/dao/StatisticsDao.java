package lt.vu.menuliukai.psk.dao;

import lt.vu.menuliukai.psk.entities.Statistics;
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

    public StatisticsDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public Statistics calculateStatistics() {
        Statistics statistics = new Statistics();
        Statistics temp;

        BeanUtils.copyProperties(temp = this.sqlSession.selectOne("selectCheapestTrip"), statistics, getNullPropertyNames(temp));
        BeanUtils.copyProperties(temp = this.sqlSession.selectOne("selectCheapestTrip"), statistics, getNullPropertyNames(temp));
        BeanUtils.copyProperties(temp = this.sqlSession.selectOne("selectMostCommonDestination"), statistics, getNullPropertyNames(temp));
        BeanUtils.copyProperties(temp = this.sqlSession.selectOne("selectShortestTrip"), statistics, getNullPropertyNames(temp));
        BeanUtils.copyProperties(temp = this.sqlSession.selectOne("selectLongestTrip"), statistics, getNullPropertyNames(temp));
        BeanUtils.copyProperties(temp = this.sqlSession.selectOne("selectMostExpensiveTrip"), statistics, getNullPropertyNames(temp));
        return statistics;
    }

    public Statistics getEmployeeTripQuantity(String param) {
        return this.sqlSession.selectOne("selectEmployeeTripQuantity", param.replace('_', ' '));
    }

    public Statistics getPeriodTripQuantity(String param, String param2) {
        Map<String, String> params = new HashMap<>();
        params.put("leavingDate", param);
        params.put("returningDate", param2);
        return this.sqlSession.selectOne("selectPeriodTripQuantity", params);
    }

    public static String[] getNullPropertyNames(Object source) {
        final BeanWrapper wrappedSource = new BeanWrapperImpl(source);
        return Stream.of(wrappedSource.getPropertyDescriptors())
                .map(FeatureDescriptor::getName)
                .filter(propertyName -> wrappedSource.getPropertyValue(propertyName) == null)
                .toArray(String[]::new);
    }
}
