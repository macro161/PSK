package lt.vu.menuliukai.psk;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Aspect
public class AuditAspect {
    /*
    @Autowired
    private List<String> accumulator;
    */

    private void println(String line) {
        System.out.println(line);
    }

    @Before("execution(* lt.vu.menuliukai.psk.controllers.*.*(..))")
    public void before(ProceedingJoinPoint jp) {
        String methodName = jp.getSignature().getName();
        System.out.println(" Call to " + methodName);
    }

    /*
    @Around("execution(* lt.vu.menuliukai.psk.controllers.EmployeeTripController.*(..))")
    public Object auditMethod(ProceedingJoinPoint jp) throws Throwable {
        String methodName = jp.getSignature().getName();
        System.out.println(" Call to " + methodName);
        return jp.proceed();
    }
    */
}