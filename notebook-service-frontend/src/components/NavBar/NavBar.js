import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap/lib';

import Logo from '../Logo/Logo';
import './NavBar.css';


class NavBar extends Component {
    render() {
        return (
            < Navbar inverse fluid staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Logo className='NavLogo' />
                    </Navbar.Brand>
                    <Navbar.Brand>Notebook-service</Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem>Service</NavItem>
                        <NavItem>Manage Clients</NavItem>
                        <NavDropdown title="Options" id="basic-nav-dropdown">
                            <MenuItem>Brands</MenuItem>
                            <MenuItem>Modifcations</MenuItem>
                            <MenuItem>Users</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem></NavItem>
                        <NavItem href="/login">Log out</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}
export default NavBar;