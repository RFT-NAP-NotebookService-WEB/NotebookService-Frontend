import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Collapse } from 'react-bootstrap/lib';

import Logo from '../Logo/Logo';
import './NavBar.css';
import UserTable from '../UserTable/UserTable';
import BrandTable from '../BrandTable/BrandTable';

class NavBar extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            UsersOpen: false,
            BrandsOpen: false
        };
    }

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
                            <NavItem>Manage Clients</NavItem>
                            <NavDropdown title="Options" id="basic-nav-dropdown">
                                <MenuItem onClick={() => this.setState({ BrandsOpen: !this.state.BrandsOpen  })}>Brands</MenuItem>
                                <MenuItem>Modifcations</MenuItem>
                                <MenuItem onClick={() => this.setState({ UsersOpen: !this.state.UsersOpen })}>Users</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem href="/register">New User</NavItem>
                            <NavItem href="/login">Log out</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar >
                <Collapse in={this.state.UsersOpen}>
                    <div>
                        <UserTable />
                    </div>
                </Collapse>
                <Collapse in={this.state.BrandsOpen}>
                    <div>
                        <BrandTable />
                    </div>
                </Collapse>
            </div>

        )
    }
}
export default NavBar;