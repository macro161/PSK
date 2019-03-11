import Office from '../officePage/Office';
import React from 'react';

const OfficeList = (props) => {
  return (
    <div>
      {props.offices.map(office => <Office office={office} />)}
    </div>
  );
};

export default OfficeList;
    