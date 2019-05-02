package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.dao.EmployeeDao;
import lt.vu.menuliukai.psk.entities.Employee;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class RestHomeController {

    private final EmployeeDao employeDao;

    public RestHomeController(EmployeeDao employeDao) {
        this.employeDao = employeDao;
    }

    @RequestMapping("/user")
    public Employee user() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        } else {
            username = principal.toString();
        }

        Employee employee = employeDao.findByUsername(username);
        employee.setPassword(null);

        return employee;
    }
}
