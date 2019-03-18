import React from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class LogIn extends React.Component {

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className = "page-frame">
                
                <div className="form-container center">
                <h2>Log In</h2>
                <div>
                <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>

                <TextField
                    id="email"
                    label="email"
                    className="form-text-field"
                    type="text"
                    margin="normal"
                />
                </div>
                <div>
                <svg className="logo" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                <TextField
                    id="password"
                    label="password"
                    className="form-text-field"
                    type="text"
                    margin="normal"
                />
                <div></div>
                <FormControlLabel
                control={
                    <Checkbox/>}
          label="Remember me"
        />
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