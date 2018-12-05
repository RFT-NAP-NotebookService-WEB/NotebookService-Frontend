import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import './NavBar.css';
import '../../assets/Modal/Modal.css';
import Products from '../../containers/Products/Products';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            showProductModal: false,
        };
    }

    handleClose() {
        this.setState({ showProductModal: false });
    }

    handleShow() {
        this.setState({ showProductModal: true });
    }

    render() {
        return (
            <div>
                <Navbar inverse fluid staticTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Logo className='NavLogo' />
                        </Navbar.Brand>
                        <Navbar.Brand>Notebook-service</Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>

                            <NavItem componentClass="span">
                                <Link to="/service">Service</Link>
                            </NavItem>
                            <NavItem componentClass="span">
                                <Link to="/manageclients">Manage Clients</Link>
                            </NavItem>
                            <NavItem componentClass="span" onClick={this.handleShow}>
                                <Button>Add Product</Button>
                            </NavItem>

                            <NavDropdown title="Options" id="basic-nav-dropdown">
                                <MenuItem componentClass="span">
                                    <Link to="/service/modifications">Modifcations</Link>
                                </MenuItem>
                                <MenuItem componentClass="span">
                                    <Link to="/service/users">Users</Link>
                                </MenuItem>
                            </NavDropdown>
                        </Nav>

                        <Nav pullRight>

                            <NavItem componentClass="span">
                                <Link to="/register">Register</Link>
                            </NavItem>
                            <NavItem componentClass="span">
                                <Link to="/login">Log out</Link>
                            </NavItem>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar >
                <div className="modal-backdrop-asd">
                    <Modal
                        bsSize="large"
                        show={this.state.showProductModal}
                        onHide={this.handleClose}
                        container={this}
                        aria-labelledby="contained-modal-title"
                        dialogClassName="custom-modal">
                        <Modal.Header closeButton>
                            <Modal.Title id="contianed-modal-title">New Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Products />{' '}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default NavBar;