import React, { Component } from 'react';
import { Form, FormControl, Col, ControlLabel, FormGroup, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import path from '../../assets/path/Path';

import 'react-table/react-table.css';
import './Products.css';
import SuccessAlert from '../../components/Alerts/SuccesAlert';
import ErrorAlert from '../../components/Alerts/ErrorAlert';

class Products extends Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);


        this.state = {
            showBrandModal: false,
            alertMessage: "",
            productAlertMessage: "",

            product: {
                id: "",
                description: "",
                type: "",
                brand: {
                    id: "",
                    name: ""
                },
                client: [{
                    email: "",
                    firstName: "",
                    id: "",
                    lastName: "",
                    phone: ""
                }]
            },

            latestClient: "",

            brandList: [],
            selectedBrand: ""
        };
    }



    handleShow() {
        this.setState({ showBrandModal: true });
    }

    handleClose() {
        this.setState({ showBrandModal: false });
    }

    componentWillMount() {

        axios.get(path + '/brands')
            .then(response => {
                return response.data
            }).then(data => {
                let brandsFromApi = data.map(Brand => { return { id: Brand.id, name: Brand.name } });
                this.setState({ brandList: [{ id: '', name: '(Select the Brand)' }].concat(brandsFromApi) });
            }).catch(error => {
                console.log(error);
            });
    }

    addBrandHandler = () => {
        var data = {
            name: this.brandInput.value,
        };



        axios.post(path + '/brand', data)
            .then((response) => {
                console.log(response.data);
                let brandList = [...this.state.brandList];
                brandList.push(response.data);
                this.setState({ brandList });
                this.setState({ alertMessage: "success" });
                console.log("ez a brandlist state: ", this.state.brandList)
            })
            .catch((error) => {
                console.log(error);
                this.setState({ alertMessage: "error" });
            });
    }

    addJobHandler = () => {

        var clientData = {
            firstName: this.firstnameInput.value,
            lastName: this.lastnameInput.value,
            email: this.emailInput.value,
            phone: this.phoneInput.value
        };

        axios.post(path + '/client', clientData)
            .then(response => {
                return response.data;
            }).then(data => {
                var productData = {
                    description: this.descriptionInput.value,
                    brandId: this.state.selectedBrand,
                    type: this.typeInput.value,
                    clientId: data.id,
                };

                axios.post(path + '/product', productData)
                    .then((response) => {
                        console.log(response);
                        this.setState({ productAlertMessage: "success" })
                    }).catch((error) => {
                        console.log(error);
                    });
            }).catch(error => {
                console.log(error)
                this.setState({ productAlertMessage: "error" })
            });
    }

    render() {

        return (
            <div>
                <Form
                    horizontal>
                    <FormGroup>
                        <Col
                            className="ProductTextModal"
                            componentClass={ControlLabel} sm={1}>
                            Brand
                                            </Col>
                        <Col sm={10}>
                            <select
                                className="SelectBrandDropdown"
                                value={this.state.selectedBrand}
                                onChange={(selectBrand) => this.setState({ selectedBrand: selectBrand.target.value })}>
                                {this.state.brandList.map((Brand) =>
                                    <option key={Brand.id} value={Brand.id}>{Brand.name}</option>)}
                            </select>{' '}
                            <Button 
                                className="AddBrandButton"
                                bsStyle="primary" 
                                onClick={this.handleShow}>Add brand
                            </Button>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col
                            className="TypeTop"
                            componentClass={ControlLabel} sm={1}>
                            Type
                        </Col>
                        <Col 
                        sm={10}
                        className="TypeTopInput">
                            <FormControl
                                inputRef={input => this.typeInput = input}
                                type="type"
                                placeholder="Product type"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col
                            className="ProductTextModal"
                            componentClass={ControlLabel} sm={1}>
                            Description
                                            </Col>
                        <Col
                            sm={10}
                            className="ProductInputTextField">
                            <FormControl
                                inputRef={input => this.descriptionInput = input}
                                type="description"
                                placeholder="Description"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col
                            className="ProductTextModal"
                            componentClass={ControlLabel} sm={1}>
                            Client
                                             </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col
                            className="ClientModal"
                            componentClass={ControlLabel} sm={2}>
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
                        <Col
                            className="ClientModal"
                            componentClass={ControlLabel} sm={2}>
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
                        <Col
                            className="ClientModal"
                            componentClass={ControlLabel} sm={2}>
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
                        <Col
                            className="ClientModal"
                            componentClass={ControlLabel} sm={2}>
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
                        <Button
                            onClick={this.addJobHandler}
                            className="SubmitJobButton">Submit
                        </Button>
                        <FormGroup>
                            {this.state.productAlertMessage === "success" ? <SuccessAlert /> : null}
                            {this.state.productAlertMessage === "error" ? <ErrorAlert /> : null}
                        </FormGroup>


                    </FormGroup>

                </Form>


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
                        <FormGroup>
                            <FormControl
                                inputRef={input => this.brandInput = input}
                                type="brandname" />
                            <Button onClick={() => { this.addBrandHandler() }}>Add</Button>
                        </FormGroup>
                        <FormGroup>
                            {this.state.alertMessage === "success" ? <SuccessAlert /> : null}
                            {this.state.alertMessage === "error" ? <ErrorAlert /> : null}
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Products;
