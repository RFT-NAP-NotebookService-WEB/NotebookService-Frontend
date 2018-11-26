import React, { Component } from 'react';
import {FormGroup , Button, ButtonGroup, ButtonToolbar, ListGroup, ListGroupItem} from 'react-bootstrap/lib';
import { Redirect, Route } from 'react-router-dom/';
import Sidebar from "react-sidebar";

import './Service.css';

class Service extends Component {
    state = {
        toLogin: false,
        toManageClients: false,
        toBrandModif: false
    }

    render() {
        return (
            <div>
                <Route exact path='/service' 
                    render={() => 
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
                                        <ButtonGroup vertical className="pull-left">
                                            <Button  bsSize="large" type="button">Services</Button>
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
                            <footer>
                                <FormGroup className="ButtonContainer">
                                    <Button bsSize="medium" type="button" className="pull-left">Logout</Button>
                                </FormGroup>
                            </footer>
                    } />
            </div>
        );
    }
}
export default Service;