import React, { Component } from 'react';
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

            product: {
                id: "",
                description: "",
                type: "",
                brandId: {
                    id: "",
                    name: ""
                },
                client: {
                    email: "",
                    firstName: "",
                    id: "",
                    lastName: "",
                    phone: ""
                }
            },

            clientList: [],

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

        axios.get(path + '/brands')
            .then(response => {
                return response.data
            }).then(data => {
                let brandsFromApi = data.map(Brand => { return { value: Brand.id, display: Brand.name } });
                this.setState({ brandList: [{ value: '', display: '(Select the Brand)' }].concat(brandsFromApi) });
            }).catch(error => {
                console.log(error);
            });

        axios.get(path + '/clients')
            .then(response => {
                return response.data
            }).then(data => {
                this.setState({ clientList: data });
                console.log("EZ A GET CLIENTLIST TOMB STATE: ", this.state.clientList)
            }).catch(error => {
                console.log(error);
            });
    }

    addJobHandler = () => {

        var productData = {
            description: this.descriptionInput.value,
            brandId: this.state.selectedBrand,
            type: this.typeInput.value,
            clientId: this.state.clientList.value,
        };

        var clientData = {
            firstName: this.firstnameInput.value,
            lastName: this.lastnameInput.value,
            email: this.emailInput.value,
            phone: this.phoneInput.value
        };

        axios.post(path + '/client', clientData)
            .then((response) => {
                console.log(response);
                this.setState({ product: clientData });
                this.setState({ product: productData });
                console.log("EZ A PRODUCT STATEJE", this.state.product);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.post(path + '/product', productData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
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
                        <Col
                            className="ProductTextModal"
                            componentClass={ControlLabel} sm={1}>
                            Type
                        </Col>
                        <Col 
                        sm={10}
                        className="ProductInputTextField">
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
                        className="SubmitJobButton">Submit</Button>

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
                        <Brands />
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
