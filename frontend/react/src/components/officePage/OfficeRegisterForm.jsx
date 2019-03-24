import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class OfficeRegisterForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            city : '',
            address : '',
        }
    }

    inputChange(e){
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    onSubmit(){
        this.props.onSubmit(Math.floor(Math.random()*10000).toString(), this.state.city, this.state.address);
    }

    render(){
        return(
            <div className="popup">
                <div className="popup-small">
                    <header className="form-header">
                        <span className="form-header-text">Register new office</span>
                        <span className="form-header-close" onClick={this.props.onClose}>✖</span>
                    </header>
                    <div className="form-container">
                        <TextField
                            id="city"
                            label="City"
                            className="form-text-field"
                            type="text"
                            margin="normal"
                            onChange={this.inputChange.bind(this)}
                            />
                            <br/>
                        <TextField
                            id="address"
                            label="Address"
                            className="form-text-field-wide"
                            type="text"
                            margin="normal"
                            onChange={this.inputChange.bind(this)}
                        />
                        <div className="register-form-buttons">
                        <Button variant="contained" size="large" color="primary" onClick={this.onSubmit.bind(this)}>
                        Register
                        </Button>
                        <Button variant="contained" size="large" color="secondary" className="cancel-button" onClick={this.props.onClose}>
                        Cancel
                        </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}