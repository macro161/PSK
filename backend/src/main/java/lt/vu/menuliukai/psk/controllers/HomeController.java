package lt.vu.menuliukai.psk.controllers;

import lt.vu.menuliukai.psk.dao.EmployeeDao;
import lt.vu.menuliukai.psk.dao.OfficeDao;
import lt.vu.menuliukai.psk.entities.Employee;
import lt.vu.menuliukai.psk.entities.Office;
import lt.vu.menuliukai.psk.entities.SignupForm;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;

@Controller
@RequestMapping("/")
public class HomeController {

    private final EmployeeDao employeDao;

    private final OfficeDao officeDao;

    public HomeController(EmployeeDao employeDao, OfficeDao officeDao) {
        this.employeDao = employeDao;
        this.officeDao = officeDao;
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }


    @RequestMapping(value = "signup")
    public String addStudent(Model model){
        model.addAttribute("signupform", new SignupForm());
        return "signup";
    }

    @RequestMapping(value = "saveuser", method = RequestMethod.POST)
    public String save(@Valid @ModelAttribute("signupform") SignupForm signupForm, BindingResult bindingResult) {
        System.out.println(bindingResult.toString());
        if (!bindingResult.hasErrors()) { // validation errors
            if (signupForm.getPassword().equals(signupForm.getPasswordCheck())) { // check password match
                String pwd = signupForm.getPassword();
                BCryptPasswordEncoder bc = new BCryptPasswordEncoder();
                String hashPwd = bc.encode(pwd);

                Employee newUser = new Employee();
                newUser.setPassword(hashPwd);
                newUser.setUsername(signupForm.getUsername());
                newUser.setRole("USER");
                if (employeDao.findByEmail(signupForm.getUsername()) == null) {
                    Office office = new Office();
                    newUser.setOffice(officeDao.save(office));
                    employeDao.save(newUser);
                } else {
                    bindingResult.rejectValue("username", "error.userexists", "Username already exists");
                    return "signup";
                }
            }
            else {
                bindingResult.rejectValue("passwordCheck", "error.pwdmatch", "Passwords does not match");
                return "signup";
            }
        }
        else {
            return "signup";
        }
        return "redirect:/login";
    }
}
