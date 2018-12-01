import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Maintenance from '../../components/Maintenance/Maintenance';

import './Service.css';


class Service extends Component {
    render() {
        return (
            <div>
                <Route exact path='/service'
                    render={() =>
                        <div>
                            <NavBar/>
                            <Maintenance />
                        </div>
                    } />

            </div>
        );
    }
}
export default Service;