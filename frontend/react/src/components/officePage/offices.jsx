import React from 'react';

const testData = [
  {city:"Vilnius", address:"135 Zalgirio g., Vilnius, LT-08217, Lithuania"},
  {city:"Kaunas", address:"11d. Juozapaviciaus pr., Kaunas, LT-45252, Lithuania"},
];

const OfficeList = (props) => (
<div>
  {props.offices.map(office => <Office{...office}/>)}
</div>
);

export default class Office extends React.Component {
render() {
  const office = this.props;
  return (
    <div className="github-profile">
      <div className="info">
        <div className="City">{office.city}</div>
        <div className="Address">{office.address}</div>
      </div>
    </div>
  );
}
}

class Offices extends React.Component {
state = {
  offices: testData,
};

render() {
  return (
    <div>
      <div className="header">Devbridge offices</div>
      
      <OfficeList offices={this.state.offices} />
    </div>
  );
}	
}

// ReactDOM.render(
// <App title="Devbridge offices" />,
// mountNode,
// );
