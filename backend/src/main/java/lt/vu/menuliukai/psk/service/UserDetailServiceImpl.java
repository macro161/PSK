package lt.vu.menuliukai.psk.service;

import lt.vu.menuliukai.psk.dao.EmployeeDao;
import lt.vu.menuliukai.psk.entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


/**
 * This class is used by spring controller to authenticate and authorize user
 **/
@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private final EmployeeDao employeeDao;

    @Autowired
    public UserDetailServiceImpl(EmployeeDao employeeDao) {
        this.employeeDao = employeeDao;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException
    {
        Employee curruser = employeeDao.findByEmail(email);
        if (curruser == null){
            throw new UsernameNotFoundException("Email " + email +" not found");
        }
        UserDetails user = new org.springframework.security.core.userdetails.User(email, curruser.getPassword(), true,
        		true, true, true, AuthorityUtils.createAuthorityList(curruser.getRole()));
        
        System.out.println("ROLE: " + curruser.getRole());
        return user;
    }
    
}