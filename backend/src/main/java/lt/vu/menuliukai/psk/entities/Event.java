package lt.vu.menuliukai.psk.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
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

    public Event(Employee employee, Date startDate, Date endDate, String eventType){
        this.employee = employee;
        this.startDate = startDate;
        this.endDate = endDate;
        this.eventType = eventType;
    }

}
