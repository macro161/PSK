package lt.vu.menuliukai.psk.util;

import java.util.Iterator;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class StreamUtils {

    public static <T> Stream<T> asStream(Iterator<T> sourceIterator) {
        return asStream(sourceIterator, false);
    }

    public static <T> Stream<T> asStream(Iterator<T> sourceIterator, boolean parallel) {
        return asStream(asIterable(sourceIterator), parallel);
    }

    public static <T> Stream<T> asStream(Iterable<T> sourceIterable) {
        return asStream(sourceIterable, false);
    }

    public static <T> Stream<T> asStream(Iterable<T> sourceIterable, boolean parallel) {
        return StreamSupport.stream(sourceIterable.spliterator(), parallel);
    }

    public static <T> Iterable<T> asIterable(Iterator<T> iterator)
    {
        Iterable<T> iterable = () -> iterator;
        return iterable;
    }
}
