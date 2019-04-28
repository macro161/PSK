package lt.vu.menuliukai.psk.mybatis.dao;

import lt.vu.menuliukai.psk.mybatis.model.Statistics;
import org.apache.ibatis.annotations.Select;
import org.mybatis.cdi.Mapper;

@Mapper
public interface StatisticsMapper {
    @Select("select 42 as `number` from dual")
    Statistics calculateStatistics();
}
