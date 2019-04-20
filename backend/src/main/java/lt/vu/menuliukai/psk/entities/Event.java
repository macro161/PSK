package lt.vu.menuliukai.psk.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.vu.menuliukai.psk.converters.EmployeeConverter;
import lt.vu.menuliukai.psk.converters.IdObjectToLongConverter;
import lt.vu.menuliukai.psk.converters.OfficeConverter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter

@Entity
@NoArgsConstructor
@Table(name="EVENT")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    @ManyToOne
    @JoinColumn
    @JsonSerialize(converter = IdObjectToLongConverter.class)
    @JsonDeserialize(converter = EmployeeConverter.class)
    @JsonProperty("employee")
    private Employee employee;

    private Date startDate;

    private Date endDate;

    private String eventType;

}
