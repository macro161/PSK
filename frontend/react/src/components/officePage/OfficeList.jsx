const OfficeList = (props) => (
    <div>
      {props.offices.map(office => <Office{...office}/>)}
    </div>
    );
    