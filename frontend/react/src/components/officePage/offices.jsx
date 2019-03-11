import React from 'react';
import OfficeList from '../officePage/OfficeList';

const testData = [
    {city:"Vilnius", address:"135 Zalgirio g., Vilnius, LT-08217, Lithuania"},
    {city:"Kaunas", address:"11d. Juozapaviciaus pr., Kaunas, LT-45252, Lithuania"},
  ];

export default class Offices extends React.Component {
    
    constructor(props){
      super(props)
      this.state = {
        offices: testData,
      };
    }

    
    render() {
      return (
        <div>
          <div className="header">Devbridge offices</div>
          
          <OfficeList offices={this.state.offices} />
        </div>
    );
  }	
}