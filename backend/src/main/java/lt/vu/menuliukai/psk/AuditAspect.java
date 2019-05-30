package lt.vu.menuliukai.psk;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.aspectj.lang.reflect.MethodSignature;

import java.net.URI;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.regex.Pattern;

@Aspect
@Component
public class AuditAspect {

    private void println(String string) {
        Path path = Paths.get(URI.create("file:///C:/Users/tvari/Desktop/Uni/log.txt"));
        try {
            java.nio.file.Files.write(path, (string + System.lineSeparator()).getBytes("UTF-8"), StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        } catch (Exception exception) {
        }
    }

    private String getFullName(String label, JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        String className = joinPoint.getTarget().getClass().getSimpleName().split(Pattern.quote("$$"))[0];
        String methodName = signature.getMethod().getName();
        return label + ": " + className + "." + methodName;
    }

    @Before("execution(* lt.vu.menuliukai.psk.service.*.*(..))")
    public void before(JoinPoint jp) {
        if (jp.getSignature() != null) {
            String username = PskApplication.getUsername();
            String log = " Call to " + getFullName("Service", jp) + " by " + username;
            println(log);
        }
    }
}