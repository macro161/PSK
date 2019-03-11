import React from 'react';

const testData = [
    {city:"Vilnius", address:"135 Zalgirio g., Vilnius, LT-08217, Lithuania"},
    {city:"Kaunas", address:"11d. Juozapaviciaus pr., Kaunas, LT-45252, Lithuania"},
  ];

export default class Offices extends React.Component {
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