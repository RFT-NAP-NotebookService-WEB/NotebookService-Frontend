import React, { Component } from 'react';
import { Modal, FormGroup, FormControl, Checkbox, Button, Image } from 'react-bootstrap/lib';

import './UserLogin.css';
//import UserRegister from './UserRegister/UserRegister';
import Redirect from 'react-router-dom/Redirect';
import Route from 'react-router-dom/Route';
import UserRegister from './UserRegister/UserRegister';



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
                <Route path="/" exact render={() =>
                    <Modal.Dialog bsSize="small">
                        <Modal.Header >
                            <Image src="https://cdn.pixabay.com/photo/2017/03/08/14/20/flat-2126880_960_720.png" rounded />
                            <Modal.Title>Notebook-service</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormGroup className="UserDataContainer">
                                <FormControl bsSize="large" type="username" placeholder="Username" />
                                <FormControl bsSize="large" type="password" placeholder="Password" />
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <FormGroup className="ButtonContainer">
                                <Button bsSize="large" type="submit">Log in</Button>
                                <Button bsSize="large" type="button" onClick={() => this.registerHandler()}> Register</Button>
                                <Checkbox>Remember me</Checkbox>
                            </FormGroup>
                        </Modal.Footer>
                    </Modal.Dialog>
                } />
                <UserRegister/>
            </div>
        );
    }
}

export default UserLogin;