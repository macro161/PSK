import React from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

class LogIn extends React.Component {

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className = "page-frame">
                
                <div className="form-container center">
                <h2>Log In</h2>
                <TextField
                    id="email"
                    label="email"
                    className="form-text-field"
                    type="text"
                    margin="normal"
                />
                <br/>
                <TextField
                    id="password"
                    label="password"
                    className="form-text-field"
                    type="text"
                    margin="normal"
                />
                <div>
                    <br/>
                <Button variant="contained" size="large" color="primary" >
                    Log In
                </Button>
                </div>
            </div>
            </div>
        );
    }
}

export default LogIn;