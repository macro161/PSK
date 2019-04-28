package lt.vu.menuliukai.psk.dao;

import lt.vu.menuliukai.psk.entities.Statistics;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

@Component
public class StatisticsDao {
    private final SqlSession sqlSession;

    public StatisticsDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public Statistics calculateStatistics() {
        return this.sqlSession.selectOne("calculateStatistics");
    }
}
