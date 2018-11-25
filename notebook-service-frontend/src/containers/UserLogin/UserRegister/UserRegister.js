import React, { Component } from 'react';
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap/lib';
import { Route, Redirect } from 'react-router-dom/';

import './UserRegister.css';
import Logo from '../../../components/Logo/Logo';

class UserRegister extends Component {
    state = {
        toHome: false,
    }

    homeHandler = (event) => {
        this.setState({ toHome: true })
    }

    render() {

        if (this.state.toHome === true) {
            return (
                <Redirect to='/' />
            )
        }

        return (
            <div>
                <Route exact path="/register"
                    render={() =>
                        <Modal.Dialog bsSize="small">
                            <Modal.Header >
                                <Logo />
                                <Modal.Title>Registration</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FormGroup className="UserDataContainer">
                                    <FormControl bsSize="small" type="username" placeholder="Username" />
                                    <FormControl bsSize="small" type="password" placeholder="Password" />
                                    <FormControl bsSize="small" type="passwordConfirm" placeholder="Password again" />
                                    <FormControl bsSize="small" type="userrole" placeholder="User Role" />
                                </FormGroup>
                            </Modal.Body>
                            <Modal.Footer>
                                <FormGroup className="ButtonContainer">
                                    <Button bsSize="large" type="submit" onClick={() => { this.homeHandler() }}>Confirm</Button>
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