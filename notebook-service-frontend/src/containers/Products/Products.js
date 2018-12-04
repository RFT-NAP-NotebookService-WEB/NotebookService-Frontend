import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import SplitterLayout from 'react-splitter-layout';
import ReactTable from 'react-table';
import { Form, FormControl, Col, ControlLabel, FormGroup, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import path from '../../assets/path/Path';

import 'react-table/react-table.css';
import './Products.css';
import Brands from '../../components/Brands/Brands';

class Products extends Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            showBrandModal: false,
            tableData: [{
                description: '',
                id: '',
                type: '',
                brand: {
                    name: '',
                    id: '',
                },
                client: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    id: ''
                }
            }],
            clientList: [],
            selectedClient: "",

            brandList: [],
            selectedBrand: ""

        };
    }

    handleClose() {
        this.setState({ showBrandModal: false });
    }

    handleShow() {
        this.setState({ showBrandModal: true });
    }


    componentDidMount() {

        axios.get(path + '/products', {
            responseType: 'json'
        }).then((response) => {
            this.setState({ tableData: response.data });
            console.log(response.data);
        });

        axios.get(path + '/clients')
            .then(response => {
                return response.data
            }).then(data => {
                let clientsFromApi = data.map(Client => { return { value: Client.id, display: Client.firstName + ' ' + Client.lastName } });
                this.setState({ clientList: [{ value: '', display: '(Select the Client)' }].concat(clientsFromApi) });
            }).catch(error => {
                console.log(error);
            });

        axios.get(path + '/brands')
            .then(response => {
                return response.data
            }).then(data => {
                let brandsFromApi = data.map(Brand => { return { value: Brand.id, display: Brand.name } });
                this.setState({ brandList: [{ value: '', display: '(Select the Brand)' }].concat(brandsFromApi) });
            }).catch(error => {
                console.log(error);
            });
    }

    addProductHandler = () => {

        var data = {
            description: this.descriptionInput.value,
            brandId: this.state.selectedBrand,
            type: this.typeInput.value,
            clientId: this.state.selectedClient,
        };

        axios.post(path + '/product', data)
            .then((response) => {
                console.log(response);
                let tableData = [...this.state.tableData];
                tableData.push(data);
                this.setState({ tableData });
                console.log(tableData);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    render() {

        const { tableData } = this.state;

        const columns = [
            {
                Header: 'Product',
                columns: [
                    {
                        Header: 'Description',
                        accessor: 'description'
                    }, {
                        Header: 'Brand',
                        accessor: 'brand.name',
                    }, {
                        Header: 'Type',
                        accessor: 'type'
                    }]
            }, {
                Header: 'Clients',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'client.firstName',

                    }, {
                        Header: 'Last Name',
                        accessor: 'client.lastName',
                    }
                ]
            }, {
                Header: "Info",
                columns: [
                    {
                        Header: 'E-mail',
                        accessor: 'client.email'
                    },
                    {
                        Header: 'Phone',
                        accessor: 'client.phone'
                    }
                ]
            }
        ]

        return (
            <div>
                <NavBar />
                <SplitterLayout vertical>
                    <div>
                        <Form horizontal>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={1}>
                                    Brand
                                            </Col>
                                <Col sm={10}>
                                    <select
                                        value={this.state.selectedBrand}
                                        onChange={(selectBrand) => this.setState({ selectedBrand: selectBrand.target.value })}>
                                        {this.state.brandList.map((Brand) =>
                                            <option key={Brand.value} value={Brand.value}>{Brand.display}</option>)}
                                    </select>{' '}
                                    <Button bsStyle="primary" onClick={this.handleShow}>
                                        Add brand
                                    </Button>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={1}>
                                    Product Type
                                            </Col>
                                <Col sm={10}>
                                    <FormControl
                                        inputRef={input => this.typeInput = input}
                                        type="type"
                                        placeholder="Product type" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={1}>
                                    Description
                                            </Col>
                                <Col sm={10}>
                                    <FormControl
                                        inputRef={input => this.descriptionInput = input}
                                        type="description"
                                        placeholder="Description" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={1}>
                                    Client
                                             </Col>
                                <Col sm={10}>
                                    <select
                                        value={this.state.selectedClient}
                                        onChange={(selectClient) => this.setState({ selectedClient: selectClient.target.value })}>
                                        {this.state.clientList.map((Client) =>
                                            <option key={Client.value} value={Client.value}>{Client.display}</option>)}
                                    </select>
                                </Col>
                            </FormGroup>

                            <FormGroup>

                                <Col sm={2}>
                                    <Button onClick={() => this.addProductHandler()}>Add product</Button>
                                </Col>
                            </FormGroup>

                            
                        </Form>
                        <div className="modal-container" style={{ height: 200 }}>
                            <Modal
                                bsSize="small"
                                show={this.state.showBrandModal}
                                onHide={this.handleClose}
                                container={this}
                                aria-labelledby="contained-modal-title">
                                <Modal.Header closeButton>
                                    <Modal.Title id="contianed-modal-title">Add brand</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Brands />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
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

export default Products;
