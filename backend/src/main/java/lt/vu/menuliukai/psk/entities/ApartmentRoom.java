package lt.vu.menuliukai.psk.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.vu.menuliukai.psk.converters.IdObjectToLongConverter;
import lt.vu.menuliukai.psk.converters.LongToOfficeConverter;

import java.util.List;

@Getter
@Setter

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="ROOM")
public class ApartmentRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    int space; // Don't know how to name this

    boolean taken;

    String address;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "office_apartment_id", nullable = false)
    @JsonDeserialize(converter = LongToOfficeConverter.class)
    @JsonSerialize(converter = IdObjectToLongConverter.class)
    Office office;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "apartmentRoom")
    @JsonIgnore
    List<Trip> trips;
}