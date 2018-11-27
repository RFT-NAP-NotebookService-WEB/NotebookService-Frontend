import React, { Component } from 'react';
import {
    FormGroup, 
    ListGroup, ListGroupItem, Navbar, Nav, NavItem,
} from 'react-bootstrap/lib';
import { Route, Redirect } from 'react-router-dom/';
import { slide as Menu } from 'react-burger-menu';

import './Service.css';
import Logo from '../../../components/Logo/Logo';

class Service extends Component {
    state = {
        toLogin: false
    }

    logoutHandler = () => {
        this.setState({ toLogin: true })
    }

    render() {

        if (this.state.toLogin === true) {
            return (
                <Redirect to='/login' />
            )
        }

        return (
            <div>
                <Route exact path='/service'
                    render={() =>
                        <div>

                            <Navbar inverse collapseOnSelect fluid="true" staticTop="true">
                                <Navbar.Header>
                                    <Navbar.Brand>
                                        <Logo className='NavLogo' />
                                    </Navbar.Brand>
                                    <Navbar.Brand>
                                        Notebook-service
                                    </Navbar.Brand>
                                </Navbar.Header>
                                <Navbar.Collapse>
                                    <Nav pullRight>
                                        <NavItem className="LogOut" bsStyle="large" onClick={() => this.logoutHandler()}>
                                            Log out
                                         </NavItem>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>

                            <Menu>
                                <a id="services" className="menu-item" href="/service">Services</a>
                                <a onClick={() => this.manageClientsHandler()} id="manageClients" className="menu-item" href="/manageclients">Manage Clients</a>
                                <a id="brandModification" className="menu-item" href="">Brand Modification</a>
                                <a id="options" className="menu-item" href="/contact">Options</a>
                            </Menu>

                            <FormGroup className="JobsList">
                                <ListGroup>
                                    <ListGroupItem href="#link1">Job gonna be here</ListGroupItem>
                                    <ListGroupItem href="#link1">Job gonna be here</ListGroupItem>
                                    <ListGroupItem href="#link1">Job gonna be here</ListGroupItem>

                                </ListGroup>
                            </FormGroup>

                        </div>
                    } />
            </div>
        );
    }
}
export default Service;