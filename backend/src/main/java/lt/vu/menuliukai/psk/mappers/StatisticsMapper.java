package lt.vu.menuliukai.psk.mappers;

import lt.vu.menuliukai.psk.entities.Statistics;
import org.mybatis.cdi.Mapper;

@Mapper
public interface StatisticsMapper {
    Statistics calculateStatistics();
}
