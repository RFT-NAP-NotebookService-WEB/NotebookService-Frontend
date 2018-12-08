import React, { Component } from 'react';
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap/lib';
import { Link } from 'react-router-dom/';
import path from '../../assets/path/Path';
import axios from 'axios';

import './UserRegister.css';
import Logo from '../../components/Logo/Logo';
import SuccessAlert from '../../components/Alerts/SuccesAlert';
import ErrorAlert from '../../components/Alerts/ErrorAlert';

class UserRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alertMessage: ""
        };
    }

    registerHandler = () => {
        axios.post(path + '/register', {
            username: this.usernameInput.value,
            password: this.userPasswordInput.value,
            passwordConfirm: this.userPasswordAgainInput.value,
            userRole: this.userRoleInput.value
        })
            .then(response => {
                console.log(response);
                this.setState({ alertMessage: "success" })
            }).catch(error => {
                console.log(error);
                this.setState({ alertMessage: "error" })
            });
    }

    render() {


        return (
            <div>
                <Modal.Dialog
                    className="RegisterModal"
                    bsSize="small">
                    <Modal.Header >
                        <Logo className="RegisterLogo" />
                        <Modal.Title>Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup className="UserDataContainer">
                            <FormControl
                                inputRef={input => this.usernameInput = input}
                                bsSize="small"
                                type="username"
                                placeholder="Username" />
                            <FormControl
                                inputRef={input => this.userPasswordInput = input}
                                bsSize="small"
                                type="password"
                                placeholder="Password" />
                            <FormControl
                                inputRef={input => this.userPasswordAgainInput = input}
                                bsSize="small"
                                type="password"
                                placeholder="Password again" />
                            <FormControl
                                inputRef={input => this.userRoleInput = input}
                                bsSize="small"
                                type="userrole"
                                placeholder="User Role" />
                        </FormGroup>
                        <FormGroup>
                            {this.state.alertMessage === "success" ? <SuccessAlert /> : null}
                            {this.state.alertMessage === "error" ? <ErrorAlert /> : null}
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <FormGroup className="RegisterButtonContainer">
                            <Button componentClass="button" className="registerButton" bsSize="large" type="submit"
                                onClick={() => { this.registerHandler() }}>
                                Confirm
                            </Button>
                            <Button componentClass="button" className="registerButton" bsSize="large" type="button">
                                <Link to='/login'>Cancel</Link>
                            </Button>
                        </FormGroup>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default UserRegister;