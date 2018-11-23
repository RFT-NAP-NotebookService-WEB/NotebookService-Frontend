import React from 'react';
import { Modal } from 'react-bootstrap';
import {FormGroup ,FormControl, Checkbox,Button,Image} from 'react-bootstrap/lib';


import './UserLogin.css';




const UserLogin = () => {
    return (

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
                    <Button bsSize="large" type="button">Sign in</Button>
                    <Checkbox>Remember me</Checkbox>
                </FormGroup>
            </Modal.Footer>
        </Modal.Dialog>

    );
}

export default UserLogin;