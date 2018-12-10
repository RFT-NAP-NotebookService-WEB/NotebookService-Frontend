import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Form, FormGroup, FormControl, Button, Col, ControlLabel } from 'react-bootstrap';
import SplitterLayout from 'react-splitter-layout';
import axios from 'axios';

import 'react-table/react-table.css';
import './ModificationTable.css';
import path from '../../assets/path/Path';
import NavBar from '../NavBar/NavBar';
import AuthService from '../Authentication/Authentication';

class ModificationTable extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService()
        this.state = {
            tableData: [{
                id: '',
                name: '',
                price: ''
            }],
        };
    }

    componentWillMount() {

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.Auth.getToken()
        }

        axios.get(path + '/modifications', {
            headers: headers
        }).then((response) => {
            this.setState({ tableData: response.data });
            console.log(response.data);
        });
    }

    addModificationHandler = () => {

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.Auth.getToken()
        }

        var data = {
            name: this.newModification.value,
            price: this.newModificationPrice.value
        };

        axios.post(path + '/modification', data, { headers: headers }
        ).then((response) => {
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

        const { tableData } = this.state;

        const columns = [
            {
                Header: 'Name',
                accessor: 'name'
            }, {
                Header: 'Price',
                accessor: 'price'
            }]

        return (
            <div>
                <NavBar />
                <SplitterLayout primaryIndex={0}>
                    <div>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Modification
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        inputRef={input => this.newModification = input}
                                        type="modification"
                                        placeholder="Modification" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Price
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        inputRef={input => this.newModificationPrice = input}
                                        type="price"
                                        placeholder="Price" />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={2}>
                                    <Button onClick={() => { this.addModificationHandler() }}>Add</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                    <div>
                        <ReactTable
                            data={tableData}
                            columns={columns}
                            minRows={15}
                            defaultPageSize={10}
                            defaultSorted={[
                                {
                                    id: "name"
                                }
                            ]}
                            className="-striped -highlight" />
                    </div>
                </SplitterLayout>
            </div>
        )
    }
}

export default ModificationTable; 