package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.dao.StatisticsDao;
import lt.vu.menuliukai.psk.entities.Statistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistics/")
public class StatisticsController {

    @Autowired
    private StatisticsDao statisticsDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Statistics index() {
        return statisticsDao.calculateStatistics();
    }

}
