package lt.vu.menuliukai.psk.converters;

import com.fasterxml.jackson.databind.util.StdConverter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;



public class IdConverter extends StdConverter<Object, List<Long>> {
    private IdObjectToLongConverter converter = new IdObjectToLongConverter();

    @Override
    public List<Long> convert(Object value) {
        if (value instanceof List<?>) {
            List<Object> list = (List<Object>)value;
            return list.stream().map(val -> converter.convert(val)).collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }
}
