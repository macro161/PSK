package lt.vu.menuliukai.psk.service;

import lt.vu.menuliukai.psk.entities.Employee;

public interface EmployeeService {
    Iterable<Employee> findAll();

    Employee findById(long id);

    Employee add(Employee employee);

    Employee edit(long id, Employee employee);

    void delete(long id);
}
