package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.entities.Office;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/office")
public class OfficeController {
    private List<Office> offices = new ArrayList<>();

    private static long id = 102;

    public OfficeController() {
        offices.add(new Office(100, "Vilnius", "135 Zalgirio g., Vilnius, LT-08217, Lithuania"));
        offices.add(new Office(101, "Kaunas", "11d. Juozapaviciaus pr., Kaunas, LT-45252, Lithuania"));
    }

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Office> index() {
        return offices;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Office add(@RequestBody Office office) {
        office.setId(id++);
        offices.add(office);
        return office;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable long id) {
        if (!offices.removeIf(office -> office.getId() == id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "office with id does not exist");
        }
    }
}
