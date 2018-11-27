import React, { Component } from 'react';
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap/lib';
import { Route, Redirect } from 'react-router-dom/';
import axios from 'axios';

import './UserRegister.css';
import Logo from '../../../components/Logo/Logo';

class UserRegister extends Component {
    state = {
        toHome: false,
    }

    homeHandler = (event) => {
        this.setState({ toHome: true })
    }

    registerHandler = (props) => {
        axios.post('http://192.168.0.103:8080/register', {
            username: this.usernameInput.value,
            password: this.userPasswordInput.value,
            passwordConfirm: this.userPasswordAgainInput.value,
            userRole: this.userRoleInput.value
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {

        if (this.state.toHome === true) {
            return (
                <Redirect to='/login' />
            )
        }

        return (
            <div>
                <Route exact path="/register"
                    render={() =>
                        <Modal.Dialog bsSize="small">
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
                            </Modal.Body>
                            <Modal.Footer>
                                <FormGroup className="RegisterButtonContainer">
                                    <Button bsSize="large" type="submit" onClick={() => { this.registerHandler() }}>Confirm</Button>
                                    <Button bsSize="large" type="button" onClick={() => { this.homeHandler() }}>Cancel</Button>
                                </FormGroup>
                            </Modal.Footer>
                        </Modal.Dialog>
                    } />
            </div>
        );
    }
}

export default UserRegister;