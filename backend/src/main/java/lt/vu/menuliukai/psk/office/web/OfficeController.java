package lt.vu.menuliukai.psk.office.web;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("office")
public class OfficeController {

    @RequestMapping(value = "/getString", method = RequestMethod.GET, produces = "application/json")
    public SpringResponse index() {
        return new SpringResponse("some string");
    }
}
