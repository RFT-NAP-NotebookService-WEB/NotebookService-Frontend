import React, { Component } from 'react';
import { Modal, FormGroup, FormControl, Checkbox, Button } from 'react-bootstrap/lib';
import { Link } from 'react-router-dom';

import './UserLogin.css';
import Logo from '../../components/Logo/Logo';



class UserLogin extends Component {

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
                            <FormControl bsSize="large" type="username" placeholder="Username" required />
                            <FormControl bsSize="large" type="password" placeholder="Password" required />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <FormGroup className="LoginButtonContainer">
                            <Button componentClass="button" bsSize="large" type="submit">
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

export default UserLogin;