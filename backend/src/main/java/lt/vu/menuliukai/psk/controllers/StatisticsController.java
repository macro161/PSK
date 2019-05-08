package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.dao.StatisticsDao;
import lt.vu.menuliukai.psk.entities.Statistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsDao statisticsDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Statistics index() {
        return statisticsDao.calculateStatistics();
    }

    @RequestMapping(value = "/{param}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Statistics getName(@PathVariable String param) {
        return statisticsDao.getEmployeeTripQuantity(param);
    }

    @RequestMapping(value = "/{param}/{param2}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Statistics getDate(@PathVariable("param") String param, @PathVariable("param2") String param2) {
        return statisticsDao.getPeriodTripQuantity(param, param2);
    }

}
