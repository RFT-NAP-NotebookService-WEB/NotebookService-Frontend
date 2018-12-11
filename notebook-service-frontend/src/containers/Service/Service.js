import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Maintenance from '../Maintenance/Maintenance';

import './Service.css';


class Service extends Component {
    render() {
        return (
            <div>
                 <NavBar/>
                <Maintenance />
            </div>
        );
    }
}

export default Service;