import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Form, ControlLabel, Col } from 'react-bootstrap';
import axios from 'axios';

import 'react-table/react-table.css';
import './ManageClients.css';
import path from '../../assets/path/Path';

class ManageClients extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        axios.get(path + '/clients', {
            responseType: 'json'
        }).then((response) => {
            this.setState({ tableData: response.data });
            console.log(response.data);
        });
    }


    addClientHandler = () => {
        var data = {
            firstName: this.firstnameInput.value,
            lastName: this.lastnameInput.value,
            email: this.emailInput.value,
            phone: this.phoneInput.value
        };

        axios.post(path + '/client', data)
            .then((response) => {
                console.log(response);
                let tableData = [...this.state.tableData];
                tableData.push(data);
                this.setState({ tableData });
            })
            .catch((error) => {
                console.log(error);
            });
    }



    render() {
        return (
            <div>
                <Form horizontal>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            First Name
                                            </Col>
                        <Col sm={10}>
                            <FormControl
                                inputRef={input => this.firstnameInput = input}
                                type="firstName"
                                placeholder="First name" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Last Name
                                            </Col>
                        <Col sm={10}>
                            <FormControl
                                inputRef={input => this.lastnameInput = input}
                                type="lastName"
                                placeholder="Last name" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                                            </Col>
                        <Col sm={10}>
                            <FormControl
                                inputRef={input => this.emailInput = input}
                                type="email"
                                placeholder="E-mail" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Phone
                                            </Col>
                        <Col sm={10}>
                            <FormControl
                                inputRef={input => this.phoneInput = input}
                                type="phone"
                                placeholder="Phone" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={2}>
                            <Button onClick={() => this.addClientHandler()}>Confirm</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default ManageClients;
