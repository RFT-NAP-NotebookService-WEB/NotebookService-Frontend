import React, { Component } from 'react';
import { FormGroup, Button, ButtonGroup, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap/lib';
import { Route, Redirect } from 'react-router-dom/';
import { slide as Menu } from 'react-burger-menu';

import './Service.css';

class Service extends Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super(props);
        this.state = {
            toLogin: false,
            toManageClients: false,
            toBrandModif: false,
        }
    }
    
    manageClientsHandler = (event) => {
        this.setState({ toManageClients: true })
    }

    render() {

        if (this.state.toLogin === true) {
            return (
                <Redirect to='/login' />
            )
        }
        
        if (this.state.toManageClients === true) {
            return (
                <Redirect to='/manageclients' />
            )
        }

        return (
            <div>
                <Route exact path='/service'
                    render={() =>
                        <div>
                            <Menu>
                                <a id="services" className="menu-item" href="/service">Services</a>
                                <a onClick={() => this.manageClientsHandler()} id="manageClients" className="menu-item" href="/manageclients">Manage Clients</a>
                                <a id="brandModification" className="menu-item" href="">Brand Modification</a>
                                <a id="options" className="menu-item" href="/contact">Options</a>
                            </Menu>
                            <h>
                                <title>Notebook-service</title>
                            </h>
                            <body>
                                <FormGroup className="JobsList">
                                    <ListGroup>
                                        <ListGroupItem href="#link1">Job gonna be here</ListGroupItem>
                                        <ListGroupItem href="#link2">Job gonna be here</ListGroupItem>
                                        <ListGroupItem href="#link3">Job gonna be here</ListGroupItem>
                                    </ListGroup>
                                </FormGroup>
                            </body>
                            <FormGroup className="ButtonContainer">
                                <Button bsSize="medium" type="button" onClick={() => this.logoutHandler()}>Logout</Button>
                            </FormGroup>
                        </div>
                    } />
                    <Route exact path='/manageclients' 
                        render={() => 
                        <div>
                            <h>
                                <title>Manage Clients</title>
                            </h>
                        </div>} />
            </div>
            
        );
    }
}
export default Service;