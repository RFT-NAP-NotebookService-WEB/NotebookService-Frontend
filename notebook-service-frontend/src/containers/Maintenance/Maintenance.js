import React, { Component } from 'react';
import ReactTable from 'react-table';
import DatePicker from "react-datepicker";
import { Form, FormGroup, Jumbotron, ControlLabel, Button, Modal, FormControl } from 'react-bootstrap';
import SplitterLayout from 'react-splitter-layout';
import axios from 'axios';

import 'react-table/react-table.css';
import "react-datepicker/dist/react-datepicker.css";

import './Maintenance.css';
import path from '../../assets/path/Path';


class Maintenance extends Component {
    constructor(props) {
        super(props);


        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {

            showProductModal: false,

            tableData: [{
                maintenance: {
                    id: "",
                    startDate: "",
                    endDate: "",
                    status: "",
                    fault: "",
                    user: {
                        id: "",
                        username: "",
                        password: "",
                        userRole: ""
                    },
                    product: {
                        id: "",
                        description: "",
                        type: "",
                        brand: {
                            id: "",
                            name: ""
                        },
                        client: {
                            id: '',
                            firstName: "",
                            lastName: "",
                            email: "",
                            phone: ""
                        }
                    },
                    modification: [
                        {
                            id: "",
                            name: "",
                            price: ""
                        }
                    ]
                }
            }],

            selectedTableRow: {
                id: "",
                startDate: "",
                endDate: "",
                status: "",
                fault: "",
                user: {
                    id: "",
                    username: "",
                    password: "",
                    userRole: ""
                },
                product: {
                    id: "",
                    description: "",
                    type: "",
                    brand: {
                        id: "",
                        name: ""
                    },
                    client: {
                        id: '',
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: ""
                    }
                },
                modification: [
                    {
                        id: "",
                        name: "",
                        price: ""
                    }
                ]
            },

            latestProduct: "",
            latestUser: "",
            latestModification: "",

            modificationList: [],
            selectedModification: "",

            startDate: new Date(),
            endDate: new Date()
        }
    }


    componentWillMount() {

        axios.get(path + '/maintenances', {
            responseType: 'json'
        }).then(response => {
            this.setState({ tableData: response.data })
            console.log(this.state.tableData)
        }).catch(error => {
            console.log(error)
        });

        axios.get(path + '/products', {
            responseType: 'json'
        }).then(response => {
            var maxId = Math.max.apply(Math, response.data.map(Product => { return Product.id; }))
            var latestProductObj = response.data.find(Product => { return Product.id === maxId })
            this.setState({ latestProduct: latestProductObj })
        }).catch(error => {
            console.log(error)
        });

        axios.get(path + '/users', {
            responseType: 'json'
        }).then(response => {
            var maxId = Math.max.apply(Math, response.data.map(User => { return User.id; }))
            var latestUserObj = response.data.find(User => { return User.id === maxId })
            this.setState({ latestUser: latestUserObj })
        });

        axios.get(path + '/modifications')
            .then(response => {
                return response.data
            }).then(data => {
                let modificationsFromApi = data.map(Modification => { return { value: Modification.id, display: Modification.name } });
                this.setState({ modificationList: [{ value: '', display: '(Select the Modification)' }].concat(modificationsFromApi) });
            }).catch(error => {
                console.log(error);
            });
    }

    handleClose() {
        this.setState({ showMaintenanceModal: false });
    }

    handleShow() {
        this.setState({ showMaintenanceModal: true });
    }

    handleChange(date) {
        this.setState({
            startDate: date,
            endDate: date
        })
    }

    addMaintenanceHandler = () => {

        axios.get(path + '/modifications')
            .then(response => {

                console.log(response)

                var maxId = Math.max.apply(Math, response.data.map(Modification => { return Modification.id; }))
                var latestModificationObj = response.data.find(Modification => { return Modification.id === maxId })
                this.setState({ latestModification: latestModificationObj })
            }).then(() => {

                var maintenanceData = {
                    startDate: " ",
                    endDate: " ",
                    status: "RECORDED",
                    fault: " ",
                    productId: this.state.latestProduct.id,
                    userId: this.state.latestUser.id,
                    modificationsId: []
                };

                axios.post(path + '/maintenance', maintenanceData)
                    .then(response => {
                        console.log(response);
                        let tableData = [...this.state.tableData];
                        tableData.push(response.data);
                        this.setState({ tableData });
                    }).catch(error => {
                        console.log(error);
                    });
            }).catch(error => {
                console.log(error)
            });
    }


    submitJobHandler = () => {
        this.setState({ ...this.state.selectedTableRow, fault: this.faultInput.value })
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
                        Header: 'Type',
                        accessor: 'product.type'
                    }, {
                        Header: 'Description',
                        accessor: 'product.description'
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
                                <Jumbotron className="ClientJumbotronPadding">

                                    <h1 className="ClientHeader">Clients: </h1>
                                    <Form horizontal>
                                        <FormGroup>
                                            <ControlLabel>Name</ControlLabel>
                                        </FormGroup>
                                        <FormGroup className="InputFormGroup">
                                            <ControlLabel>{this.state.selectedTableRow.product.client.firstName + " " + this.state.selectedTableRow.product.client.lastName}</ControlLabel>
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Email</ControlLabel>
                                        </FormGroup>
                                        <FormGroup className="InputFormGroup">
                                            <ControlLabel>{this.state.selectedTableRow.product.client.email}</ControlLabel>
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Phone</ControlLabel>
                                        </FormGroup>
                                        <FormGroup className="InputFormGroup">
                                            <ControlLabel>{this.state.selectedTableRow.product.client.phone}</ControlLabel>
                                        </FormGroup>
                                        <FormGroup >
                                            <Button onClick={this.addMaintenanceHandler}>Add</Button>
                                        </FormGroup>
                                    </Form>
                                </Jumbotron>
                            </div>
                            <div>
                                <Jumbotron className="MaintenanceJumbotronPadding">

                                    <h1 className="MaintenanceHeader">Maintenance: </h1>
                                    <div className="MaintenanceParagraph">
                                        <Form horizontal>
                                            <FormGroup>
                                                <ControlLabel>Startdate</ControlLabel>{' '}
                                                <ControlLabel>Fault</ControlLabel>{' '}
                                                <ControlLabel>Price</ControlLabel>
                                            </FormGroup>
                                            <FormGroup className="InputFormGroup">
                                                <ControlLabel>{this.state.selectedTableRow.startDate}</ControlLabel>{' '}
                                                <ControlLabel>{this.state.selectedTableRow.fault}</ControlLabel>{' '}
                                                <ControlLabel></ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>endDate</ControlLabel>{' '}
                                                <ControlLabel>Modification</ControlLabel>
                                            </FormGroup>
                                            <FormGroup className="InputFormGroup">
                                                <ControlLabel>{this.state.selectedTableRow.endDate}</ControlLabel>{' '}
                                                <ControlLabel></ControlLabel>
                                            </FormGroup>
                                            <Button onClick={this.handleShow}>Add</Button>
                                        </Form>
                                    </div>

                                </Jumbotron>
                            </div>

                        </SplitterLayout>
                    </div>


                    <div>
                        <ReactTable
                            data={tableData}
                            columns={columns}
                            defaultPageSize={10}
                            getTrProps={(state, rowInfo) => {
                                if (rowInfo !== undefined) {
                                    return {
                                        onClick: (e, handleOriginal) => {
                                            console.log('It was in this row:', rowInfo)
                                            this.setState({
                                                selectedTableRow: rowInfo.original
                                            })
                                            console.log('ez a tablerow stateje', this.state.selectedTableRow)
                                        },
                                        style: {
                                            cursor: 'pointer',
                                            background: rowInfo.original.id === this.state.selectedTableRow.id ? '#00afec' : 'white',
                                            color: rowInfo.original.id === this.state.selectedTableRow.id ? 'white' : 'black'
                                        }
                                    }
                                } else {
                                    return {}
                                }
                            }
                            }

                            defaultSorted={[
                                {
                                    id: "name"
                                }
                            ]}
                            className="-striped -highlight" />
                    </div>

                </SplitterLayout>

                <div className="modal-backdrop-asd">
                    <Modal
                        bsSize="large"
                        show={this.state.showMaintenanceModal}
                        onHide={this.handleClose}
                        container={this}
                        aria-labelledby="contained-modal-title"
                        dialogClassName="custom-modal">
                        <Modal.Header closeButton>
                            <Modal.Title id="contianed-modal-title">Maintenance</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormGroup className="InputFormGroup">
                                <ControlLabel>{this.state.selectedTableRow.product.brand.name}</ControlLabel>
                            </FormGroup>
                            <FormGroup className="InputFormGroup">
                                <ControlLabel>{this.state.selectedTableRow.product.type}</ControlLabel>
                            </FormGroup>
                            <FormGroup>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange} />{' '}
                                <DatePicker
                                    selected={this.state.endDate}
                                    onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup className="InputFormGroup">
                                <FormControl placeholder="Faults" inputRef={input => this.faultInput = input} />
                            </FormGroup>
                            <FormGroup>
                                <select
                                    value={this.state.selectedModification}
                                    onChange={(selectModification) => this.setState({ selectedModification: selectModification.target.value })}>
                                    {this.state.modificationList.map((Modification) =>
                                        <option key={Modification.value} value={Modification.value}>{Modification.display}</option>)}
                                </select>{' '}
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>{this.state.selectedModification.price}</ControlLabel>
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.submitJobHandler}>Save</Button>
                            <Button onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div >
        )
    }
}

export default Maintenance;