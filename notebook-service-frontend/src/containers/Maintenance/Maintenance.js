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
                }
            }],
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
            modification: [{
                id: '',
                name: '',
                price: ''
            }],

            selectedTableRow: {
                id: "",
                description: "",
                type: "",
                brand: {
                    id: '',
                    name: ''
                },
                client: {
                    id: '',
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: ""
                }
            },
            user: {
                id:"",
                name: "",
                userRole: ""
            },

            startDate: new Date(),
            endDate: new Date()
        }
    }


    componentWillMount() {

        axios.get(path + '/products', {
            responseType: 'json'
        }).then(response => {
            this.setState({
                tableData: response.data,
                product: response.data
            });
        }).catch(error => {
            console.log(error)
        });

        axios.get(path + '/modifications', {
            responseType: 'json'
        }).then(response => {
            this.setState({
                modification: response.data
            });
            console.log(this.state.modification)
        });

        axios.get(path + '/users', {
            responseType: 'json'
        }).then(response => {
            this.setState({
                user: response.data
            });
            console.log("ezek a userek: ",this.state.user)
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


    submitJobHandler = () => {
        var data = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            status: "RECORDED",
            fault: this.faultInput.value,
            productId: this.state.product.id,
            userId: this.state.user.id,
            modificationsId: [this.state.modification]
        };

        axios.post(path + '/maintenance', data)
            .then(response => {
                console.log(data);
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
                        accessor: 'brand.name'
                    }, {
                        Header: 'Type',
                        accessor: 'type'
                    }, {
                        Header: 'Description',
                        accessor: 'description'
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
                                            <ControlLabel>{this.state.selectedTableRow.client.firstName + ' ' + this.state.selectedTableRow.client.lastName}</ControlLabel>
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Email</ControlLabel>
                                        </FormGroup>
                                        <FormGroup className="InputFormGroup">
                                            <ControlLabel>{this.state.selectedTableRow.client.email}</ControlLabel>
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Phone</ControlLabel>
                                        </FormGroup>
                                        <FormGroup className="InputFormGroup">
                                            <ControlLabel>{this.state.selectedTableRow.client.phone}</ControlLabel>
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
                                                <ControlLabel>Startdate</ControlLabel>
                                            </FormGroup>
                                            <FormGroup className="InputFormGroup">
                                                <ControlLabel></ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>endDate</ControlLabel>
                                            </FormGroup>
                                            <FormGroup className="InputFormGroup">
                                                <ControlLabel></ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Fault</ControlLabel>
                                            </FormGroup>
                                            <FormGroup className="InputFormGroup">
                                                <ControlLabel>"fault ide"</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Modification</ControlLabel>
                                            </FormGroup>
                                            <FormGroup className="InputFormGroup">
                                                <ControlLabel>"modification ide"</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>price</ControlLabel>
                                            </FormGroup>
                                            <FormGroup className="InputFormGroup">
                                                <ControlLabel>"price ide"</ControlLabel>
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
                            minRows={5}
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
                                <ControlLabel>{this.state.selectedTableRow.brand.name + ' ' + this.state.selectedTableRow.type}</ControlLabel>
                            </FormGroup>
                            <FormGroup className="InputFormGroup">
                                <ControlLabel>{this.state.selectedTableRow.description}</ControlLabel>
                            </FormGroup>
                            <FormGroup>
                                <DatePicker
                                    dateFormat="YYYY-MM-DD"
                                    selected={this.state.startDate}
                                    onChange={this.handleChange} />{' '}
                                <DatePicker
                                    selected={this.state.endDate}
                                    onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup className="InputFormGroup">
                                <FormControl placeholder="Faults" inputRef={input => this.faultInput = input}/>
                            </FormGroup>
                            <FormGroup className="InputFormGroup">
                                <FormControl placeholder="Modifications" inputRef={input => this.modificationInput = input}/>
                            </FormGroup>
                            <FormGroup className="InputFormGroup">
                                <FormControl placeholder="Price" inputRef={input => this.priceInput = input}/>
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