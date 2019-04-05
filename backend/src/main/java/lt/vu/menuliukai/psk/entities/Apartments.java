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
import lt.vu.menuliukai.psk.converters.OfficeConverter;

import java.util.List;

@Getter
@Setter

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="APARTMENTS")
public class Apartments {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    int roomNumber;

    String address;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JsonDeserialize(converter = OfficeConverter.class)
    @JsonSerialize(converter = IdObjectToLongConverter.class)
    Office office;

}