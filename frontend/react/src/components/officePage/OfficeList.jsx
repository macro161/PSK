import Office from '../officePage/Office';

export const OfficeList = (props) => (
    <div>
      {props.offices.map(office => <Office office={office}/>)}
    </div>
    );
    