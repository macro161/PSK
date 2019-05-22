package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.dao.StatisticsDao;
import lt.vu.menuliukai.psk.entities.Statistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @Autowired
    public StatisticsController(@Qualifier("StatisticsService") StatisticsDao statisticsDao){
        this.statisticsDao = statisticsDao;
    }

    private StatisticsDao statisticsDao;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Statistics index() {
        return statisticsDao.calculateStatistics();
    }

    @RequestMapping(value = "/{fullName}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public long getName(@PathVariable String fullName) {
        return statisticsDao.getEmployeeTripQuantity(fullName);
    }

    @RequestMapping(value = "/{leavingDate}/{returningDate}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public long getDate(@PathVariable("leavingDate") String leavingDate, @PathVariable("returningDate") String returningDate) {
        return statisticsDao.getPeriodTripQuantity(leavingDate, returningDate);
    }
}
