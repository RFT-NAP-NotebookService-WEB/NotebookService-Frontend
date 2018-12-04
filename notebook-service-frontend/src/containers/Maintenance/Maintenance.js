import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Form, FormGroup, FormControl, Button, Col, Jumbotron, ControlLabel } from 'react-bootstrap';
import SplitterLayout from 'react-splitter-layout';
import axios from 'axios';

import 'react-table/react-table.css';
import './Maintenance.css';
import path from '../../assets/path/Path';


class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [{
                id: '',
                startdate: '',
                enddate: '',
                status: '',
                fault: '',
                user: {
                    id: '',
                    username: '',
                    password: '',
                    userRole: ''
                },
                product: {
                    id: '',
                    description: '',
                    type: '',
                    brand: {
                        id: '',
                        name: ''
                    },
                    client: {
                        id: '',
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: ''
                    }
                },
                modification: [
                    {
                        id: '',
                        name: '',
                        price: ''
                    }
                ]
            }],
            productList: [],
            selectedProduct: '',

            userList: [],
            selectedUser: '',

            modificationList: [],
            selectedModification: ''
        }

    }

    componentWillMount() {

        axios.get(path + '/maintenances', {
            responseType: 'json'
        }).then((response) => {
            this.setState({ tableData: response.data });
            console.log(response.data);
        });

        axios.get(path + '/products')
            .then(response => {
                return response.data
            }).then(data => {
                let productsFromApi = data.map(Product => { return { value: Product.id, display: Product.brand.name + ' ' + Product.type + ' ' + Product.client.firstName + ' ' + Product.client.lastName } });
                this.setState({ productList: [{ value: '', display: '(Select the product)' }].concat(productsFromApi) });
            }).catch(error => {
                console.log(error);
            });

        axios.get(path + '/modifications')
            .then(response => {
                return response.data
            }).then(data => {
                let modificationsFromApi = data.map(Modification => { return { value: Modification.id, display: Modification.name } });
                this.setState({ modificationList: [{ value: '', display: '(Select the modification)' }].concat(modificationsFromApi) });
            }).catch(error => {
                console.log(error);
            });

        axios.get(path + '/users')
            .then(response => {
                return response.data
            }).then(data => {
                let usersFromApi = data.map(User => { return { value: User.id, display: User.username + ' ' + User.userRole } });
                this.setState({ userList: [{ value: '', display: '(Select the user)' }].concat(usersFromApi) });
            }).catch(error => {
                console.log(error);
            });
    }


    submitJobHandler = () => {
        var data = {
            startDate: this.startdate,
            endDate: this.enddate,
            status: this.status,
            fault: this.faultInput.value,
            productId: this.state.selectedProduct,
            userId: this.state.selectedUser,
            modificationsId: [this.state.selectedModification]
        };

        axios.post(path + '/maintenance', data)
            .then(response => {
                let tableData = [...this.state.tableData];
                tableData.push(data);
                this.setState({ tableData });
                console.log(tableData);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        const { tableData } = this.state;

        const columns = [
            {
                Header: 'Product Info',
                columns: [
                    {
                        Header: 'Brand',
                        accessor: 'product.brand.name'
                    }, {
                        Header: 'Description',
                        accessor: 'product.description'
                    }, {
                        Header: 'Type',
                        accessor: 'product.type'
                    }
                ]
            }
        ]

        return (
            <div>
                <SplitterLayout vertical>

                    <div>
                        <SplitterLayout horizontal>
                            <div>
                                <Jumbotron>

                                    <h1>Clients: </h1>
                                    <p>
                                        <Form horizontal>
                                            <FormGroup>
                                                <ControlLabel>Name</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>"Kliens neve ide"</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Email</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>"Kliens emailje ide"</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Phone</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>"Kliens telefonszáma ide"</ControlLabel>
                                            </FormGroup>
                                        </Form>
                                    </p>


                                    {/* <FormGroup>

                                        <FormControl
                                            inputRef={input => this.faultInput = input}
                                            type="fault"
                                            placeholder="Fault" />

                                        <Col sm={10}>
                                            <select
                                                value={this.state.selectedProduct}
                                                onChange={(selectProduct) => this.setState({ selectedProduct: selectProduct.target.value })}>
                                                {this.state.productList.map((Product) =>
                                                    <option key={Product.value} value={Product.value}>{Product.display}</option>)}
                                            </select>
                                        </Col>

                                        <Col sm={10}>
                                            <select
                                                value={this.state.selectedModification}
                                                onChange={(selectModification) => this.setState({ selectedModification: selectModification.target.value })}>
                                                {this.state.modificationList.map((Modification) =>
                                                    <option key={Modification.value} value={Modification.value}>{Modification.display}</option>)}
                                            </select>
                                        </Col>

                                        <Col sm={10}>
                                            <select
                                                value={this.state.selectedUser}
                                                onChange={(selectUser) => this.setState({ selectedUser: selectUser.target.value })}>
                                                {this.state.userList.map((User) =>
                                                    <option key={User.value} value={User.value}>{User.display}</option>)}
                                            </select>
                                        </Col>

                                        <Button
                                            onClick={() => { this.submitJobHandler() }}
                                            type="submit">Add</Button>

                                    </FormGroup> */}
                                </Jumbotron>
                            </div>
                            <div>
                                <Jumbotron>
                                    
                                <h1>Maintenance: </h1>
                                    <p>
                                        <Form horizontal>
                                            <FormGroup>
                                                <ControlLabel>Startdate</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>"startdate ide"</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>endDate</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>"endDate ide"</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Fault</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>"fault ide"</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Modification</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>"modification ide"</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>price</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>"price ide"</ControlLabel>
                                            </FormGroup>
                                        </Form>
                                    </p>

                                </Jumbotron>
                            </div>

                        </SplitterLayout>
                    </div>


                    <div>
                        <ReactTable
                            data={tableData}
                            columns={columns}
                            minRows={5}
                            defaultPageSize={10}
                            defaultSorted={[
                                {
                                    id: "name"
                                }
                            ]}
                            className="-striped -highlight" />
                    </div>

                </SplitterLayout>
            </div >
        )
    }
}

export default Maintenance;