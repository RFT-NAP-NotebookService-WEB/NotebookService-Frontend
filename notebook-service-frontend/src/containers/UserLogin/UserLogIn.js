import React, { Component } from 'react';
import { Modal, FormGroup, FormControl, Checkbox, Button} from 'react-bootstrap/lib';
import { Redirect, Route } from 'react-router-dom/';

import './UserLogin.css';
import Logo from '../../components/Logo/Logo';



class UserLogin extends Component {
    state = {
        toRegister: false,
    }

    registerHandler = (event) => {
        this.setState({ toRegister: true })
    }

    render() {

        if (this.state.toRegister === true) {
            return (
                <Redirect to='/register' />
            )
        }

        return (

            <div>
                <Route exact path="/"
                    render={() =>
                        <Modal.Dialog bsSize="small">
                            <Modal.Header >
                                <Logo />
                                <Modal.Title>Notebook-service</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FormGroup className="UserDataContainer">
                                    <FormControl bsSize="large" type="username" placeholder="Username" required/>
                                    <FormControl bsSize="large" type="password" placeholder="Password" required/>
                                </FormGroup>
                            </Modal.Body>
                            <Modal.Footer>
                                <FormGroup className="ButtonContainer">
                                    <Button bsSize="large" type="submit">Log in</Button>
                                    <Button bsSize="large" type="button" onClick={() => this.registerHandler()}>Register</Button>
                                    <Checkbox>Remember me</Checkbox>
                                </FormGroup>
                            </Modal.Footer>
                        </Modal.Dialog>
                    } />
            </div>
        );
    }
}

export default UserLogin;