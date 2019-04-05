package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.mappers.StatisticsMapper;
import lt.vu.menuliukai.psk.entities.Trip;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistics/")
public class StatisticsController {

    private StatisticsMapper statisticsMapper;

    public StatisticsController(StatisticsMapper statisticsMapper) {
        this.statisticsMapper = statisticsMapper;
    }
}
