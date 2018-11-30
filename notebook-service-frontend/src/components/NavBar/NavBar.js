import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap/lib';

import Logo from '../Logo/Logo';
import './NavBar.css';

class NavBar extends Component {
    render() {
        return (
            <div>
                < Navbar inverse fluid staticTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Logo className='NavLogo' />
                        </Navbar.Brand>
                        <Navbar.Brand>Notebook-service</Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>

                            <NavItem href="/service">Service</NavItem>
                            <NavItem href="/manageClients" >Manage Clients</NavItem>
                            <NavItem href="/products">Products</NavItem>

                            <NavDropdown title="Options" id="basic-nav-dropdown">

                                <MenuItem href="/service/brands">Brands</MenuItem>
                                <MenuItem href="/service/modifications" >Modifcations</MenuItem>
                                <MenuItem href="/service/users">Users</MenuItem>

                            </NavDropdown>
                        </Nav>

                        <Nav pullRight>

                            <NavItem href="/register">New User</NavItem>
                            <NavItem href="/login">Log out</NavItem>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar >
            </div>
        )
    }
}
export default NavBar;