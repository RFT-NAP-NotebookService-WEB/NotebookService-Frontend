import React, { Component } from 'react';
import { Modal, FormGroup, FormControl, Checkbox, Button} from 'react-bootstrap/lib';
import { Redirect, Route } from 'react-router-dom/';

import './UserLogin.css';
import Logo from '../../components/Logo/Logo';



class UserLogin extends Component {
    state = {
        toRegister: false,
        toService: false,
    }

    registerHandler = (event) => {
        this.setState({ toRegister: true })
    }

    serviceHandler = (event) => {
        this.setState({toService: true})
    }

    render() {

        if (this.state.toRegister === true) {
            return (
                <Redirect to='/register' />
            )
        } else if (this.state.toService === true) {
            return (
                <Redirect to='/service' />
            )
        }

        return (

            <div>
                <Route exact path="/login"
                    render={() =>
                        <Modal.Dialog bsSize="small">
                            <Modal.Header >
                                <Logo className="LoginLogo"/>
                                <Modal.Title>Notebook-service</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FormGroup className="UserDataContainer">
                                    <FormControl bsSize="large" type="username" placeholder="Username" required/>
                                    <FormControl bsSize="large" type="password" placeholder="Password" required/>
                                </FormGroup>
                            </Modal.Body>
                            <Modal.Footer>
                                <FormGroup className="LoginButtonContainer">
                                    <Button bsSize="large" type="submit" onClick={() => this.serviceHandler()}>Log in</Button>
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