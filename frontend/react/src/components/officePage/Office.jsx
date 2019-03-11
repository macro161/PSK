import React from 'react';

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