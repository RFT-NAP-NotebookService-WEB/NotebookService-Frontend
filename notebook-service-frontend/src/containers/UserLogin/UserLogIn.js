import React, { Component } from 'react';
import { Modal, FormGroup, FormControl, Checkbox, Button } from 'react-bootstrap/lib';
import { Link, withRouter } from 'react-router-dom';

import './UserLogin.css';
import AuthService from '../../components/Authentication/Authentication';
import Logo from '../../components/Logo/Logo';
import axios from 'axios';
import path from '../../assets/path/Path';

class UserLogin extends Component {

    constructor(props) {
        super(props);

        this.Auth = new AuthService();
    }


    loginHandler = () => {

        var loginData = {
            username: this.usernameInput.value,
            password: this.passwordInput.value
        }

        axios.post(path + '/login', loginData)
            .then(response => {
                this.Auth.setToken(response.data.token)
            }).catch(error => {
                console.log(error)
            })
    }



    render() {
        return (

            <div>
                <Modal.Dialog bsSize="small">
                    <Modal.Header >
                        <Logo className="LoginLogo" />
                        <Modal.Title>Notebook-service</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup className="UserDataContainer">
                            <FormControl
                                inputRef={input => this.usernameInput = input}
                                bsSize="large"
                                type="username"
                                placeholder="Username"
                                onChange={this.handleChange} />
                            <FormControl
                                inputRef={input => this.passwordInput = input}
                                bsSize="large"
                                type="password"
                                placeholder="Password"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <FormGroup className="LoginButtonContainer">
                            <Button onClick={this.loginHandler} componentClass="button" bsSize="large" type="submit">
                                <Link to='/service'>Log in</Link>
                            </Button>
                            <Checkbox>Remember me</Checkbox>
                        </FormGroup>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default withRouter(UserLogin);