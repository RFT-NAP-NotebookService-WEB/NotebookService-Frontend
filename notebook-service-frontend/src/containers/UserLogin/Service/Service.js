import React, { Component } from 'react';
import {
    FormGroup, Button, ButtonGroup, ButtonToolbar,
    ListGroup, ListGroupItem, Navbar, Nav, NavItem,
} from 'react-bootstrap/lib';
import { Route, Redirect } from 'react-router-dom/';
import Sidebar from "react-sidebar";

import './Service.css';
import Logo from '../../../components/Logo/Logo';

class Service extends Component {
    state = {
        toLogin: false,
        toManageClients: false,
        toBrandModif: false
    }

    logoutHandler = (event) => {
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

                            <Sidebar
                                sidebar={<b>Sidebar content</b>}
                                styles={{ sidebar: { background: "white" } }}
                            ></Sidebar>

                            <h>
                                <title>Notebook-service</title>
                            </h>
                            <body>
                                <table>
                                    <tr>
                                        <th>Buttons</th>
                                        <th>Jobs</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <FormGroup className="MainOptions">
                                                <ButtonToolbar>
                                                    <ButtonGroup vertical>
                                                        <Button bsSize="large" type="button">Services</Button>
                                                        <Button bsSize="large" type="button">Manage Clients</Button>
                                                        <Button bsSize="large" type="button">Options</Button>
                                                        <Button bsSize="large" type="button">Brand Modification</Button>
                                                    </ButtonGroup>
                                                </ButtonToolbar>
                                            </FormGroup>
                                        </td>
                                        <td width="100%">
                                            <FormGroup className="JobsList">
                                                <ListGroup>
                                                    <ListGroupItem href="#link1">Job gonna be here</ListGroupItem>
                                                    <ListGroupItem href="#link2">Job gonna be here</ListGroupItem>
                                                    <ListGroupItem href="#link3">Job gonna be here</ListGroupItem>

                                                </ListGroup>
                                            </FormGroup>
                                        </td>
                                    </tr>
                                </table>
                            </body>
                        </div>
                    } />
            </div>
        );
    }
}
export default Service;