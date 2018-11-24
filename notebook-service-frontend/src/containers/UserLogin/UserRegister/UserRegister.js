import React, { Component } from 'react';
import { Modal, FormGroup, FormControl, Button, Image } from 'react-bootstrap/lib';
import { Route } from 'react-router-dom';

import './UserRegister.css';
import Redirect from 'react-router-dom/Redirect';




class UserRegister extends Component {

    state = {
        toHome: false,
    }
    
    homeHandler = (event) => {
        this.setState({toHome: true})
    }

    render() {

        if (this.state.toHome === true ){
            return (
                <Redirect to='/'/>
            )
        }
        return (
            <div>
                <Route path="/register" exact render={() =>
                    <Modal.Dialog bsSize="small">
                        <Modal.Header >
                            <Image src="https://cdn.pixabay.com/photo/2017/03/08/14/20/flat-2126880_960_720.png" rounded />
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
                                <Button bsSize="large" type="submit" onClick={()=>{this.homeHandler()}}>Confirm</Button>
                                <Button bsSize="large" type="button" onClick={()=>{this.homeHandler()}}>Cancel</Button>
                            </FormGroup>
                        </Modal.Footer>
                    </Modal.Dialog>
                } />
            </div>
        );
    }
}

export default UserRegister;