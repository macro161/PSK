package lt.vu.menuliukai.psk.converters;

import com.fasterxml.jackson.databind.util.StdConverter;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;

public class IdObjectToLongConverter extends StdConverter<Object, Long> {
    @Override
    public Long convert(Object value) {
        Class klass = value.getClass();
        Method method = Arrays.stream(klass.getMethods()).filter(m -> m.getName().equals("getId")).findFirst().get();
        try {
            return (Long)method.invoke(value, new Object[] { });
        } catch (IllegalAccessException | InvocationTargetException exception) {
            return null;
        }
    }
}