package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.mybatis.dao.StatisticsMapper;
import lt.vu.menuliukai.psk.mybatis.model.Statistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistics/")
public class StatisticsController {

    @Autowired
    private StatisticsMapper statisticsMapper;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Statistics index() {
        return statisticsMapper.calculateStatistics();
    }

}
