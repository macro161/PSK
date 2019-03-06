import React from 'react';
import Header from '../components/header/Header';
import { Route } from 'react-router';
import PropTypes from 'prop-types';

const PublicLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <div>
        <Header />
        <Component {...matchProps} />
      </div>
    )} />
  );
};

PublicLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired, 
};
  
export default PublicLayoutRoute;