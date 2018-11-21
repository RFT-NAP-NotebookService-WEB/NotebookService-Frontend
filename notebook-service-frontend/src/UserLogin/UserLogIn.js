import React from 'react';
import { Modal } from 'react-bootstrap';
//import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Button from 'react-bootstrap/lib/Button';
import Image from 'react-bootstrap/lib/Image';

import './UserLogin.css';




const UserLogin = () => {
    return (

        <Modal.Dialog bsSize="small">
            <Modal.Header >
                <Modal.Title>Notebook-service</Modal.Title>
                <Image src="/public/assets/loginPicture.png" rounded />
            </Modal.Header>
            <Modal.Body>
                <FormGroup className="UserDataContainer">
                    <FormControl type="username" placeholder="Username" />
                    <FormControl type="password" placeholder="Password" />
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <FormGroup className="ButtonContainer">
                    <Button type="login">Log in</Button>
                    <Button type="signin">Sign in</Button>
                    <Checkbox>Remember me</Checkbox>
                </FormGroup>
            </Modal.Footer>
        </Modal.Dialog>

    );
}

export default UserLogin;