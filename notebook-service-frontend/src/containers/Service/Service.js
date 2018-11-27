import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';

import './Service.css';


class Service extends Component {
    render() {
        return (
            <div>
                <Route exact path='/service'
                    render={() =>
                        <div>
                            <NavBar/>
                        </div>
                    } />
            </div>
        );
    }
}
export default Service;