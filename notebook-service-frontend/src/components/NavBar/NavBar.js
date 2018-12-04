import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap/lib';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import './NavBar.css';

class NavBar extends Component {
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
                            <NavItem componentClass="span">
                                <Link to="/products">Products</Link>
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
            </div>
        )
    }
}
export default NavBar;